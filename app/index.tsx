import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Leaf,
  Recycle,
  Sparkles,
  Trash2,
  ArrowUpRight,
  ShieldCheck,
  BarChart3,
  Globe2,
} from 'lucide-react-native';

import { colors, spacing, radii, typography, shadows } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HIGHLIGHTS = [
  {
    icon: Trash2,
    tag: 'Segregation',
    title: 'Smart Sorting',
    desc: 'Instant visual classification for organic, dry & hazardous domestic waste.',
    accent: colors.lime,
  },
  {
    icon: BarChart3,
    tag: 'Household Metrics',
    title: 'Track & Reduce',
    desc: 'Measure disposal habits, prevent landfill overflow, and unlock weekly badges.',
    accent: colors.sage,
  },
  {
    icon: Globe2,
    tag: 'Circular Living',
    title: 'Eco Loop Community',
    desc: 'Connect with verified municipal pick-ups and community composting hubs.',
    accent: colors.warmSand,
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Navigation Bar */}
        <View style={styles.navBar}>
          <View style={styles.brandContainer}>
            <View style={styles.brandIconSurface}>
              <Recycle size={20} color={colors.lime} strokeWidth={2.4} />
            </View>
            <View>
              <Text style={styles.brandTitle}>CleanLoop</Text>
              <Text style={styles.brandSubtitle}>DOMESTIC WASTE INTELLIGENCE</Text>
            </View>
          </View>

          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Active Cycle</Text>
          </View>
        </View>

        {/* Hero Arch Showcase Card (Inspired by reference visual structure) */}
        <View style={styles.heroOuter}>
          <View style={styles.heroCard}>
            {/* Ambient Leaf/Eco Background Graphic Elements */}
            <View style={styles.heroBackdropAccent} />

            <View style={styles.heroBadgeRow}>
              <View style={styles.pillBadge}>
                <Sparkles size={12} color={colors.lime} />
                <Text style={styles.pillBadgeText}>Sustainable Living Made Effortless</Text>
              </View>
            </View>

            <Text style={styles.heroHeadline}>
              Waste less.{'\n'}
              <Text style={styles.heroHeadlineHighlight}>Restore more.</Text>
            </Text>

            <Text style={styles.heroDescription}>
              CleanLoop guides your household through intelligent waste segregation,
              preventing contamination and turning daily discards into renewable impact.
            </Text>

            {/* Quick Impact Mini-Card inside Hero */}
            <View style={styles.impactSnippet}>
              <View style={styles.impactIconBubble}>
                <Leaf size={18} color={colors.lime} strokeWidth={2.4} />
              </View>
              <View style={styles.impactTextGroup}>
                <Text style={styles.impactTitle}>Zero-Waste Goal</Text>
                <Text style={styles.impactSubtitle}>Up to 78% domestic diversion possible</Text>
              </View>
              <ShieldCheck size={18} color={colors.sage} />
            </View>
          </View>
        </View>

        {/* Section Headline */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionOverline}>CORE CAPABILITIES</Text>
          <Text style={styles.sectionHeading}>Engineered for conscious homes</Text>
        </View>

        {/* Feature Cards with refined surfaces and micro-details */}
        <View style={styles.featuresContainer}>
          {HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} variant="elevated" style={styles.featureCard}>
                <View style={styles.cardHeader}>
                  <View style={[styles.iconWrapper, { backgroundColor: item.accent + '22' }]}>
                    <Icon size={22} color={colors.pineGreen} strokeWidth={2.2} />
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
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandIconSurface: {
    width: 38,
    height: 38,
    borderRadius: radii.md,
    backgroundColor: colors.deepForest,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm + 2,
    ...shadows.sm,
  },
  brandTitle: {
    ...typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.deepForest,
    letterSpacing: -0.4,
  },
  brandSubtitle: {
    ...typography.size.xs,
    fontWeight: typography.weight.semibold,
    color: colors.moss,
    letterSpacing: 0.8,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs + 2,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    ...shadows.sm,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: radii.full,
    backgroundColor: colors.lime,
    marginRight: spacing.xs + 2,
  },
  statusText: {
    ...typography.size.xs,
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
    ...typography.size['4xl'],
    fontWeight: typography.weight.bold,
    color: '#FFFFFF',
    letterSpacing: -1,
    lineHeight: 44,
    marginBottom: spacing.md,
  },
  heroHeadlineHighlight: {
    color: colors.lime,
  },
  heroDescription: {
    ...typography.size.md,
    color: colors.sage,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  impactSnippet: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
  },
  impactIconBubble: {
    width: 32,
    height: 32,
    borderRadius: radii.full,
    backgroundColor: colors.pineGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm + 2,
  },
  impactTextGroup: {
    flex: 1,
  },
  impactTitle: {
    ...typography.size.xs,
    fontWeight: typography.weight.bold,
    color: '#FFFFFF',
  },
  impactSubtitle: {
    ...typography.size.xs,
    color: colors.sage,
  },

  /* Section Header */
  sectionHeader: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionOverline: {
    ...typography.size.xs,
    fontWeight: typography.weight.bold,
    color: colors.moss,
    letterSpacing: 1.2,
    marginBottom: spacing.xs,
  },
  sectionHeading: {
    ...typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.deepForest,
    letterSpacing: -0.4,
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
    width: 44,
    height: 44,
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
    ...typography.size.xs,
    fontWeight: typography.weight.semibold,
    color: colors.moss,
  },
  cardTitle: {
    ...typography.size.lg,
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
    ...typography.size.lg,
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
    height: 54,
  },
});
