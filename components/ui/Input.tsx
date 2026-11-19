import React, { ReactNode, useState, forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

import { colors, radii, spacing, typography, shadows } from '@/constants/theme';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightAction?: ReactNode;
  isPassword?: boolean;
  containerStyle?: ViewStyle;
}

export const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(function Input(
  {
    label,
    error,
    hint,
    leftIcon,
    rightAction,
    isPassword = false,
    containerStyle,
    secureTextEntry,
    ...rest
  },
  ref
) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isSecure = isPassword ? !showPassword : secureTextEntry;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          !!error && styles.inputError,
        ]}
      >
        {leftIcon && <View style={styles.leftIconWrapper}>{leftIcon}</View>}

        <TextInput
          ref={ref}
          style={styles.input}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={isSecure}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />

        {isPassword ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.rightActionWrapper}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff size={20} color={colors.moss} strokeWidth={2.2} />
            ) : (
              <Eye size={20} color={colors.moss} strokeWidth={2.2} />
            )}
          </TouchableOpacity>
        ) : (
          rightAction && <View style={styles.rightActionWrapper}>{rightAction}</View>
        )}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.size.sm,
    fontWeight: typography.weight.semibold,
    color: colors.deepForest,
    marginBottom: spacing.xs + 2,
    letterSpacing: -0.2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.borderSubtle,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    minHeight: 52,
    ...shadows.sm,
  },
  inputFocused: {
    borderColor: colors.pineGreen,
    backgroundColor: '#FFFFFF',
    shadowColor: colors.pineGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  inputError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    ...typography.size.md,
    color: colors.deepForest,
    paddingVertical: spacing.sm + 2,
    minHeight: 48,
  },
  leftIconWrapper: {
    marginRight: spacing.sm + 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightActionWrapper: {
    marginLeft: spacing.sm,
    padding: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    ...typography.size.xs,
    color: colors.error,
    fontWeight: typography.weight.medium,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
  hintText: {
    ...typography.size.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginLeft: spacing.xs,
  },
});
