import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { colors, spacing, radii, shadows } from '@/constants/theme';

type CardVariant = 'elevated' | 'flat' | 'outlined' | 'glass' | 'dark';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  variant?: CardVariant;
}

export function Card({ children, style, variant = 'elevated' }: CardProps) {
  return (
    <View style={[styles.base, variantMap[variant], style]}>
      {children}
    </View>
  );
}

const variantMap: Record<CardVariant, ViewStyle> = {
  elevated: {
    backgroundColor: colors.surface,
    ...shadows.md,
  },
  flat: {
    backgroundColor: colors.surfaceMuted,
  },
  outlined: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  dark: {
    backgroundColor: colors.surfaceGreen,
  },
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.xl,
    padding: spacing.lg,
    overflow: 'hidden',
  },
});
