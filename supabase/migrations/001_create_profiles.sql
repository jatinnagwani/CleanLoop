-- ==============================================================================
-- CleanLoop: Milestone 2 - Profiles & Authentication Database Foundation
-- Migration: 001_create_profiles.sql
-- ==============================================================================

-- 1. Create profiles table in public schema
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text,
  role text NOT NULL DEFAULT 'resident' CHECK (role IN ('resident', 'admin')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Comment on table and columns for documentation
COMMENT ON TABLE public.profiles IS 'User profiles extending Supabase auth.users for CleanLoop.';
COMMENT ON COLUMN public.profiles.id IS 'References the auth.users record ID.';
COMMENT ON COLUMN public.profiles.full_name IS 'Full display name of the user.';
COMMENT ON COLUMN public.profiles.email IS 'Email address synchronized from auth.users.';
COMMENT ON COLUMN public.profiles.role IS 'User role restricted to resident or admin.';

-- 2. Indexes for performance and lookup security
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- 3. Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 4. Helper function to check if the current user is an admin
-- SECURITY DEFINER with fixed search_path = pg_catalog prevents search_path hijacking
-- and avoids RLS recursion when querying public.profiles.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 5. Trigger function to prevent non-admins from changing their role
CREATE OR REPLACE FUNCTION public.prevent_role_modification()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    -- Only allow role modification if the executing user is an admin or service_role
    IF NOT (public.is_admin() OR (coalesce(auth.jwt() ->> 'role', '') = 'service_role')) THEN
      RAISE EXCEPTION 'Unauthorized: Users cannot modify their assigned role.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS check_profile_role_update ON public.profiles;
CREATE TRIGGER check_profile_role_update
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.prevent_role_modification();

-- 6. Trigger to automatically provision a profile on auth.users registration
-- Secure search_path = pg_catalog ensures no untrusted functions or schemas are invoked.
-- New users are strictly assigned 'resident' role; user metadata 'role' is ignored.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
DECLARE
  v_full_name text;
BEGIN
  -- Extract full_name from metadata, or fallback to email prefix / 'Resident'
  v_full_name := trim(coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  IF v_full_name = '' THEN
    v_full_name := coalesce(nullif(split_part(new.email, '@', 1), ''), 'Resident');
  END IF;

  INSERT INTO public.profiles (
    id,
    full_name,
    email,
    role,
    created_at,
    updated_at
  ) VALUES (
    new.id,
    v_full_name,
    new.email,
    'resident', -- Hardcoded default to eliminate privilege escalation on signup
    now(),
    now()
  );

  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- 7. Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 8. Row Level Security Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.is_admin());

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
CREATE POLICY "Admins can update all profiles"
ON public.profiles
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Revoke direct INSERT and DELETE from standard users.
-- Profile creation is strictly handled by on_auth_user_created trigger.
-- Profile deletion cascades from auth.users.
REVOKE INSERT, DELETE ON public.profiles FROM anon, authenticated;
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
