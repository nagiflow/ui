import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import {
  SiteHeader, Hero, LogoCloud, FeatureGrid, FeatureSplit, PlatformSection, StatsBand, CaseStudies, Testimonial,
  PricingTable, PricingComparison, FAQ, CTABand, SiteFooter, SectionHeading, Container,
} from "../../blocks/marketing/index.ts"
import { BrandMark, IsoStack } from "../../illustrations/index.ts"
import { content, isoPipeline, isoPlatform, logos, pricing } from "../fixtures/marketing.ts"
import { ConnectFlow, DashboardShot, InsightCards } from "./scenes.tsx"

const DemoLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(function DemoLink(props, ref) {
  return <a ref={ref} {...props} onClick={(e) => e.preventDefault()} />
})

const meta: Meta = { title: "Marketing/Blocks", parameters: { layout: "fullscreen" } }
export default meta
type Story = StoryObj

const c = content.ja

export const Header: Story = {
  render: () => <div className="min-h-[520px]"><SiteHeader logo={<BrandMark />} nav={c.nav} announcement={c.announcement} utilityLinks={c.utility} login={c.login} cta={c.cta} secondaryCta={c.secondaryCta} linkAs={DemoLink} /></div>,
}
export const HeaderMinimal: Story = {
  name: "Header (minimal)",
  render: () => <SiteHeader logo={<BrandMark />} nav={[{ label: "機能", href: "#" }, { label: "料金", href: "#" }, { label: "導入事例", href: "#" }]} login={c.login} cta={c.cta} linkAs={DemoLink} />,
}
export const HeroSplit: Story = {
  name: "Hero (split + iso diagram)",
  render: () => <Hero {...c.hero} primaryAction={c.hero.primary} secondaryAction={c.hero.secondary} visual={<IsoStack blocks={isoPlatform("ja")} />} linkAs={DemoLink} />,
}
export const HeroCentered: Story = {
  name: "Hero (centered + screenshot)",
  render: () => (
    <Hero variant="centered" tone="default" announcement={{ tag: "新機能", label: "AIアシスタントが一般提供を開始", href: "#" }} {...c.hero} primaryAction={c.hero.primary} secondaryAction={c.hero.secondary} visual={<DashboardShot />} linkAs={DemoLink} />
  ),
}
export const Logos: Story = { name: "Logo cloud", render: () => <LogoCloud title={c.logosTitle} logos={logos} /> }
export const FeaturesRule: Story = { name: "Feature grid (rule)", render: () => <FeatureGrid {...c.solutions} linkAs={DemoLink} /> }
export const FeaturesCard: Story = { name: "Feature grid (card)", render: () => <FeatureGrid {...c.solutions} variant="card" tone="muted" linkAs={DemoLink} /> }
export const Split: Story = {
  name: "Feature split",
  render: () => <FeatureSplit items={[{ ...c.splits[0], visual: <InsightCards /> }, { ...c.splits[1], visual: <ConnectFlow /> }]} linkAs={DemoLink} />,
}
export const Platform: Story = { render: () => <PlatformSection {...c.platform} diagram={<IsoStack blocks={isoPipeline("ja")} />} linkAs={DemoLink} /> }
export const Stats: Story = { render: () => <StatsBand stats={c.stats} /> }
export const StatsLight: Story = { name: "Stats (light)", render: () => <StatsBand tone="default" eyebrow="実績" title="数字で見る Nagiflow" stats={c.stats} /> }
export const Cases: Story = { name: "Case studies", render: () => <CaseStudies {...c.cases} action={c.cases.all} linkAs={DemoLink} /> }
export const Quote: Story = { name: "Testimonial", render: () => <Testimonial tone="muted" {...c.testimonial} /> }
export const Pricing: Story = { render: () => <PricingTable title="料金プラン" tiers={pricing.ja.tiers} yearlyBadge="年払いで2か月分お得" linkAs={DemoLink} /> }
export const PricingThree: Story = { name: "Pricing (3 tiers, en)", globals: { locale: "en" }, render: () => <div lang="en"><PricingTable title="Simple, predictable pricing" tiers={pricing.en.tiers.slice(0, 3)} billingLabels={{ monthly: "Monthly", yearly: "Yearly" }} yearlyBadge="Save 2 months" linkAs={DemoLink} /></div> }
export const Comparison: Story = { name: "Pricing comparison", render: () => <PricingComparison title="機能比較" tiers={pricing.ja.tiers} groups={pricing.ja.comparison} yesLabel="利用可" noLabel="利用不可" /> }
export const Faq: Story = { name: "FAQ", render: () => <FAQ {...c.faq} linkAs={DemoLink} /> }
export const Cta: Story = { name: "CTA band", render: () => <CTABand {...c.finalCta} primaryAction={c.finalCta.primary} secondaryAction={c.finalCta.secondary} linkAs={DemoLink} /> }
export const CtaCompact: Story = { name: "CTA band (compact)", render: () => <CTABand variant="compact" {...c.finalCta} primaryAction={c.finalCta.primary} linkAs={DemoLink} /> }
export const Footer: Story = {
  render: () => <SiteFooter logo={<BrandMark />} {...c.footer} locales={[{ value: "ja", label: "日本語" }, { value: "en", label: "English" }]} locale="ja" linkAs={DemoLink} />,
}
export const Heading: Story = {
  name: "Section heading",
  render: () => (
    <Container className="py-16">
      <SectionHeading eyebrow="プラットフォーム" title="すべての業務アプリが、同じ基盤の上に" description="Core に集約されたデータを、各プロダクトが共有します。" action={{ label: "詳しく見る", href: "#" }} linkAs={DemoLink} />
    </Container>
  ),
}
