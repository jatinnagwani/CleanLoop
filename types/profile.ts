/**
 * User roles supported in CleanLoop
 * 'resident': Default role for domestic households (segregation, collection schedules, drop-off).
 * 'admin': Municipal and community administrators with oversight privileges.
 */
export type UserRole = 'resident' | 'admin';

/**
 * CleanLoop User Profile
 * Reflects the public.profiles database table.
 */
export interface Profile {
  id: string;
  full_name: string;
  email: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

/**
 * Permitted update payload for a user's own profile.
 * Note: `role`, `id`, and timestamps are protected and cannot be self-updated.
 */
export interface ProfileUpdate {
  full_name?: string;
  email?: string;
}

/**
 * Payload structure for initial profile insertion (primarily handled by DB trigger).
 */
export interface ProfileInsert {
  id: string;
  full_name: string;
  email?: string | null;
  role?: UserRole;
  created_at?: string;
  updated_at?: string;
}
