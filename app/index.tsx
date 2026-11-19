import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Leaf,
  Recycle,
  Sparkles,
  Trash2,
  ArrowUpRight,
  CalendarCheck,
  MapPin,
  CheckCircle2,
} from 'lucide-react-native';

import { colors, spacing, radii, typography, shadows } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const HIGHLIGHTS = [
  {
    icon: Trash2,
    tag: 'Categorization',
    title: 'Waste Segregation Guide',
    desc: 'Clear rules and practical guides to separate wet, dry, recyclable, and domestic hazardous waste correctly.',
    accent: colors.lime,
  },
  {
    icon: CalendarCheck,
    tag: 'Routines',
    title: 'Collection Schedules',
    desc: 'Stay organized with household pickup reminders, collection days, and local municipal timings.',
    accent: colors.sage,
  },
  {
    icon: MapPin,
    tag: 'Local Facilities',
    title: 'Drop-off & Composting',
    desc: 'Find verified local recycling drop-offs, scrap collectors, and guidance for managing kitchen compost at home.',
    accent: colors.warmSand,
  },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isCompact = width < 360;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Navigation Bar - Responsive & robust on small screens */}
        <View style={[styles.navBar, isCompact && styles.navBarCompact]}>
          <View style={styles.brandContainer}>
            <View style={styles.brandIconSurface}>
              <Recycle size={18} color={colors.lime} strokeWidth={2.4} />
            </View>
            <View style={styles.brandTextGroup}>
              <Text style={styles.brandTitle} numberOfLines={1}>CleanLoop</Text>
              <Text style={styles.brandSubtitle} numberOfLines={1}>
                {isCompact ? 'DOMESTIC WASTE' : 'DOMESTIC WASTE GUIDE'}
              </Text>
            </View>
          </View>

          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText} numberOfLines={1}>Active Cycle</Text>
          </View>
        </View>

        {/* Hero Arch Showcase Card */}
        <View style={styles.heroOuter}>
          <View style={[styles.heroCard, isCompact && styles.heroCardCompact]}>
            {/* Ambient Background Graphic Accent */}
            <View style={styles.heroBackdropAccent} />

            <View style={styles.heroBadgeRow}>
              <View style={styles.pillBadge}>
                <Sparkles size={12} color={colors.lime} />
                <Text style={styles.pillBadgeText}>Mindful Domestic Living</Text>
              </View>
            </View>

            <Text style={[styles.heroHeadline, isCompact && styles.heroHeadlineCompact]}>
              Waste less.{'\n'}
              <Text style={styles.heroHeadlineHighlight}>Sort better.</Text>
            </Text>

            <Text style={styles.heroDescription}>
              CleanLoop helps households build practical waste management habits through
              clear segregation steps, collection schedules, and local disposal guidance.
            </Text>

            {/* Practical Household Guidance Snippet */}
            <View style={styles.impactSnippet}>
              <View style={styles.impactIconBubble}>
                <Leaf size={16} color={colors.lime} strokeWidth={2.4} />
              </View>
              <View style={styles.impactTextGroup}>
                <Text style={styles.impactTitle}>Responsible Segregation</Text>
                <Text style={styles.impactSubtitle} numberOfLines={2}>
                  Separate organic, recyclable & domestic hazardous waste
                </Text>
              </View>
              <CheckCircle2 size={16} color={colors.sage} />
            </View>
          </View>
        </View>

        {/* Section Headline */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionOverline}>CORE CAPABILITIES</Text>
          <Text style={styles.sectionHeading}>Built for everyday home management</Text>
        </View>

        {/* Feature Cards with refined surfaces and micro-details */}
        <View style={styles.featuresContainer}>
          {HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} variant="elevated" style={styles.featureCard}>
                <View style={styles.cardHeader}>
                  <View style={[styles.iconWrapper, { backgroundColor: item.accent + '22' }]}>
                    <Icon size={20} color={colors.pineGreen} strokeWidth={2.2} />
                  </View>
                  <View style={styles.cardTagPill}>
                    <Text style={styles.cardTagText}>{item.tag}</Text>
                  </View>
                </View>

                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </Card>
            );
          })}
        </View>

        {/* Action Panel / Bottom Call to Action */}
        <View style={styles.ctaWrapper}>
          <View style={styles.ctaContainer}>
            <View style={styles.ctaTextContainer}>
              <Text style={styles.ctaPromptTitle}>Ready to begin your loop?</Text>
              <Text style={styles.ctaPromptSub}>Start organizing your home waste today.</Text>
            </View>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              iconPosition="right"
              icon={<ArrowUpRight size={20} color={colors.textOnPrimary} strokeWidth={2.2} />}
              style={styles.primaryActionButton}
            >
              Get Started
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing['3xl'],
  },

  /* Top Navigation */
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs + 2,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  navBarCompact: {
    paddingHorizontal: spacing.md,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    marginRight: spacing.xs,
  },
  brandIconSurface: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.deepForest,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    flexShrink: 0,
    ...shadows.sm,
  },
  brandTextGroup: {
    flex: 1,
    minWidth: 0,
  },
  brandTitle: {
    ...typography.size.md,
    fontWeight: typography.weight.bold,
    color: colors.deepForest,
    letterSpacing: -0.3,
  },
  brandSubtitle: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: typography.weight.semibold,
    color: colors.moss,
    letterSpacing: 0.6,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 1,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    flexShrink: 0,
    ...shadows.sm,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: radii.full,
    backgroundColor: colors.lime,
    marginRight: spacing.xs + 2,
  },
  statusText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: typography.weight.semibold,
    color: colors.deepForest,
  },

  /* Hero Section */
  heroOuter: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
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
    top: -50,
    right: -50,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: colors.pineGreen,
    opacity: 0.45,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(197, 216, 109, 0.25)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radii.full,
    gap: spacing.xs + 2,
  },
  pillBadgeText: {
    ...typography.size.xs,
    color: colors.lime,
    fontWeight: typography.weight.medium,
    letterSpacing: 0.2,
  },
  heroHeadline: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: typography.weight.bold,
    color: '#FFFFFF',
    letterSpacing: -0.8,
    marginBottom: spacing.md,
  },
  heroHeadlineCompact: {
    fontSize: 28,
    lineHeight: 34,
  },
  heroHeadlineHighlight: {
    color: colors.lime,
  },
  heroDescription: {
    ...typography.size.sm,
    color: colors.sage,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  impactSnippet: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  impactIconBubble: {
    width: 30,
    height: 30,
    borderRadius: radii.full,
    backgroundColor: colors.pineGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm + 2,
    flexShrink: 0,
  },
  impactTextGroup: {
    flex: 1,
    marginRight: spacing.xs,
  },
  impactTitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: typography.weight.bold,
    color: '#FFFFFF',
  },
  impactSubtitle: {
    fontSize: 11,
    lineHeight: 15,
    color: colors.sage,
  },

  /* Section Header */
  sectionHeader: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionOverline: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: typography.weight.bold,
    color: colors.moss,
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
  },
  sectionHeading: {
    ...typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.deepForest,
    letterSpacing: -0.3,
  },

  /* Features List */
  featuresContainer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  featureCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    ...shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTagPill: {
    backgroundColor: colors.backgroundSubtle,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  cardTagText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: typography.weight.semibold,
    color: colors.moss,
  },
  cardTitle: {
    ...typography.size.md,
    fontWeight: typography.weight.bold,
    color: colors.deepForest,
    marginBottom: spacing.xs,
    letterSpacing: -0.2,
  },
  cardDesc: {
    ...typography.size.sm,
    color: colors.charcoal,
    lineHeight: 20,
    opacity: 0.82,
  },

  /* CTA Bottom */
  ctaWrapper: {
    paddingHorizontal: spacing.lg,
  },
  ctaContainer: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii['2xl'],
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    ...shadows.md,
  },
  ctaTextContainer: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  ctaPromptTitle: {
    ...typography.size.md,
    fontWeight: typography.weight.bold,
    color: colors.deepForest,
    marginBottom: 4,
  },
  ctaPromptSub: {
    ...typography.size.sm,
    color: colors.moss,
    textAlign: 'center',
  },
  primaryActionButton: {
    height: 52,
  },
});
