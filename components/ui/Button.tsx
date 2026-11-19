import { ReactNode } from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';

import { colors, spacing, radii, typography, shadows } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
}

const variantStyles: Record<ButtonVariant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: {
      backgroundColor: colors.pineGreen,
      ...shadows.md,
    },
    text: {
      color: colors.textOnPrimary,
    },
  },
  secondary: {
    container: {
      backgroundColor: colors.lime,
      ...shadows.sm,
    },
    text: {
      color: colors.textOnAccent,
    },
  },
  outline: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: colors.pineGreen,
    },
    text: {
      color: colors.pineGreen,
    },
  },
  ghost: {
    container: {
      backgroundColor: 'transparent',
    },
    text: {
      color: colors.pineGreen,
    },
  },
};

const sizeStyles: Record<ButtonSize, { container: ViewStyle; text: TextStyle }> = {
  sm: {
    container: {
      paddingVertical: spacing.sm + 2,
      paddingHorizontal: spacing.md,
      borderRadius: radii.md,
    },
    text: {
      ...typography.size.sm,
      fontWeight: typography.weight.semibold,
    },
  },
  md: {
    container: {
      paddingVertical: spacing.md - 2,
      paddingHorizontal: spacing.lg,
      borderRadius: radii.lg,
    },
    text: {
      ...typography.size.md,
      fontWeight: typography.weight.semibold,
    },
  },
  lg: {
    container: {
      paddingVertical: spacing.md + 2,
      paddingHorizontal: spacing.xl,
      borderRadius: radii.xl,
    },
    text: {
      ...typography.size.lg,
      fontWeight: typography.weight.bold,
      letterSpacing: -0.2,
    },
  },
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  disabled,
  ...rest
}: ButtonProps) {
  const vStyle = variantStyles[variant];
  const sStyle = sizeStyles[size];

  return (
    <Pressable
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        vStyle.container,
        sStyle.container,
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={vStyle.text.color} size="small" />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>{icon}</View>
          )}
          <Text style={[styles.text, vStyle.text, sStyle.text]}>
            {children}
          </Text>
          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>{icon}</View>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    textAlign: 'center',
  },
  iconLeft: {
    marginRight: spacing.sm + 2,
  },
  iconRight: {
    marginLeft: spacing.sm + 2,
  },
});
