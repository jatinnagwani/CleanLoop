/**
 * CleanLoop Design System — Forest & Earth
 *
 * A premium eco-tech design language built around deep greens,
 * warm neutrals, and subtle lime accents.
 */

export const colors = {
  /** Primary palette */
  deepForest: '#142E27',
  pineGreen: '#245746',
  moss: '#657C50',
  sage: '#A9B99A',
  warmSand: '#E8DFC9',
  lime: '#C5D86D',
  charcoal: '#252A25',

  /** Semantic aliases */
  primary: '#245746',
  primaryDark: '#142E27',
  accent: '#C5D86D',
  background: '#E8DFC9',
  backgroundSubtle: '#F0EBE0',
  surface: '#FFFFFF',
  surfaceMuted: '#F5F1EA',
  surfaceGreen: '#1B3D33',
  surfaceGreenLight: '#2A5E4A',
  textPrimary: '#142E27',
  textSecondary: '#657C50',
  textMuted: '#8A9477',
  textOnPrimary: '#FFFFFF',
  textOnAccent: '#142E27',
  textOnSurface: '#D4E3D0',
  border: '#D6CCBA',
  borderSubtle: '#E5DDD0',
  divider: '#E0D8C8',
  overlay: 'rgba(20, 46, 39, 0.5)',
  error: '#C0392B',
  success: '#245746',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 80,
} as const;

export const radii = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 28,
  full: 9999,
} as const;

export const typography = {
  /** Font families */
  family: {
    sans: 'System',
    mono: 'SpaceMono',
  },

  /** Font sizes with matching line heights */
  size: {
    xs: { fontSize: 11, lineHeight: 14 },
    sm: { fontSize: 13, lineHeight: 18 },
    md: { fontSize: 15, lineHeight: 22 },
    lg: { fontSize: 17, lineHeight: 24 },
    xl: { fontSize: 20, lineHeight: 28 },
    '2xl': { fontSize: 24, lineHeight: 30 },
    '3xl': { fontSize: 32, lineHeight: 38 },
    '4xl': { fontSize: 40, lineHeight: 46 },
    '5xl': { fontSize: 48, lineHeight: 52 },
  },

  /** Font weights */
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },
} as const;

export const shadows = {
  sm: {
    shadowColor: '#142E27',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#142E27',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  lg: {
    shadowColor: '#142E27',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },
  glow: {
    shadowColor: '#C5D86D',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
} as const;

const theme = {
  colors,
  spacing,
  radii,
  typography,
  shadows,
} as const;

export type Theme = typeof theme;

export default theme;
