import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  ArrowRight,
  Lock,
  Mail,
  Recycle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react-native';

import { colors, radii, spacing, typography, shadows } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isCompact = width < 360;

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validation error states
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      newErrors.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (hasAttemptedSubmit) {
      const trimmed = val.trim();
      if (!trimmed) {
        setErrors((prev) => ({ ...prev, email: 'Email address is required.' }));
      } else if (!EMAIL_REGEX.test(trimmed)) {
        setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address.' }));
      } else {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (hasAttemptedSubmit) {
      if (!val) {
        setErrors((prev) => ({ ...prev, password: 'Password is required.' }));
      } else if (val.length < 8) {
        setErrors((prev) => ({ ...prev, password: 'Password must be at least 8 characters.' }));
      } else {
        setErrors((prev) => ({ ...prev, password: undefined }));
      }
    }
  };

  const handleLogin = () => {
    setHasAttemptedSubmit(true);
    const isValid = validate();
    if (!isValid) {
      return;
    }

    // UI-only task: Supabase authentication logic will be wired in the next milestone.
  };

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Bar with Navigation */}
          <View style={styles.topBar}>
            <TouchableOpacity
              onPress={handleGoBack}
              style={styles.backButton}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <ArrowLeft size={20} color={colors.deepForest} strokeWidth={2.4} />
            </TouchableOpacity>

            <View style={styles.brandRow}>
              <View style={styles.brandIconSurface}>
                <Recycle size={18} color={colors.lime} strokeWidth={2.4} />
              </View>
              <Text style={styles.brandText}>CleanLoop</Text>
            </View>

            <View style={styles.topBarSpacer} />
          </View>

          {/* Hero Surface Header */}
          <View style={styles.heroOuter}>
            <View style={[styles.heroCard, isCompact && styles.heroCardCompact]}>
              <View style={styles.heroBackdropAccent} />

              <View style={styles.pillBadge}>
                <Sparkles size={12} color={colors.lime} />
                <Text style={styles.pillBadgeText}>Household Sign In</Text>
              </View>

              <Text style={[styles.heroHeadline, isCompact && styles.heroHeadlineCompact]}>
                Welcome back to{'\n'}
                <Text style={styles.heroHeadlineHighlight}>your loop.</Text>
              </Text>

              <Text style={styles.heroDescription}>
                Access your personalized waste segregation plans, schedule reminders, and local collection routines.
              </Text>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.formOuter}>
            <Card variant="elevated" style={styles.formCard}>
              <Input
                label="Email Address"
                placeholder="name@example.com"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon={<Mail size={20} color={colors.moss} strokeWidth={2.2} />}
                error={errors.email}
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={handlePasswordChange}
                isPassword
                leftIcon={<Lock size={20} color={colors.moss} strokeWidth={2.2} />}
                error={errors.password}
              />

              <Button
                variant="primary"
                size="lg"
                fullWidth
                iconPosition="right"
                icon={<ArrowRight size={20} color={colors.textOnPrimary} strokeWidth={2.2} />}
                onPress={handleLogin}
                style={styles.submitButton}
              >
                Sign In
              </Button>
            </Card>
          </View>

          {/* Bottom Switcher Link */}
          <View style={styles.footerLinkRow}>
            <Text style={styles.footerQuestion}>New to CleanLoop? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push('/(auth)/register')}
            >
              <Text style={styles.footerAction}>Create an account</Text>
            </TouchableOpacity>
          </View>

          {/* Security Note */}
          <View style={styles.securityNote}>
            <ShieldCheck size={14} color={colors.moss} strokeWidth={2.2} />
            <Text style={styles.securityNoteText}>
              End-to-end encrypted domestic account management
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing['3xl'],
  },

  /* Top Bar */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs + 2,
    paddingBottom: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIconSurface: {
    width: 30,
    height: 30,
    borderRadius: radii.sm,
    backgroundColor: colors.deepForest,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs + 2,
  },
  brandText: {
    ...typography.size.md,
    fontWeight: typography.weight.bold,
    color: colors.deepForest,
    letterSpacing: -0.3,
  },
  topBarSpacer: {
    width: 40,
  },

  /* Hero Section */
  heroOuter: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  heroCard: {
    backgroundColor: colors.deepForest,
    borderRadius: radii['2xl'],
    padding: spacing.xl,
    overflow: 'hidden',
    position: 'relative',
    ...shadows.lg,
  },
  heroCardCompact: {
    padding: spacing.lg,
    borderRadius: radii.xl,
  },
  heroBackdropAccent: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.pineGreen,
    opacity: 0.45,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(197, 216, 109, 0.25)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radii.full,
    gap: spacing.xs + 2,
    marginBottom: spacing.md,
  },
  pillBadgeText: {
    ...typography.size.xs,
    color: colors.lime,
    fontWeight: typography.weight.medium,
    letterSpacing: 0.2,
  },
  heroHeadline: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: typography.weight.bold,
    color: '#FFFFFF',
    letterSpacing: -0.6,
    marginBottom: spacing.sm,
  },
  heroHeadlineCompact: {
    fontSize: 24,
    lineHeight: 30,
  },
  heroHeadlineHighlight: {
    color: colors.lime,
  },
  heroDescription: {
    ...typography.size.sm,
    color: colors.sage,
    lineHeight: 20,
  },

  /* Form Section */
  formOuter: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: radii['2xl'],
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    ...shadows.md,
  },
  submitButton: {
    marginTop: spacing.sm,
    height: 52,
  },

  /* Footer Navigation */
  footerLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  footerQuestion: {
    ...typography.size.sm,
    color: colors.charcoal,
    opacity: 0.85,
  },
  footerAction: {
    ...typography.size.sm,
    fontWeight: typography.weight.bold,
    color: colors.pineGreen,
    textDecorationLine: 'underline',
  },

  /* Security Note */
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs + 2,
    paddingHorizontal: spacing.lg,
  },
  securityNoteText: {
    fontSize: 11,
    lineHeight: 14,
    color: colors.moss,
    fontWeight: typography.weight.medium,
  },
});
