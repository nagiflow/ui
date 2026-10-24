import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { BellRing, Eye, FileCheck2, Fingerprint, KeyRound, ScrollText } from "lucide-react"
import {
  SiteHeader, Hero, LogoCloud, FeatureGrid, FeatureSplit, PlatformSection, StatsBand, CaseStudies, Testimonial,
  PricingTable, PricingComparison, FAQ, CTABand, SiteFooter, Container, Section,
} from "../../blocks/marketing/index.ts"
import { BrandMark, IsoStack } from "../../illustrations/index.ts"
import { content, isoLayers, isoPipeline, isoPlatform, logos, pricing } from "../fixtures/marketing.ts"
import { AuditShot, ConnectFlow, DashboardShot, InsightCards } from "./scenes.tsx"

/** Storybook can't navigate; links stay in place. Real apps pass next/link as `linkAs`. */
const DemoLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(function DemoLink(props, ref) {
  return <a ref={ref} {...props} onClick={(e) => e.preventDefault()} />
})

type Lang = "ja" | "en"
type Args = { display: "sans" | "mono" }

const meta: Meta<Args> = {
  title: "Marketing/Pages",
  parameters: { layout: "fullscreen" },
  args: { display: "sans" },
  argTypes: { display: { control: "inline-radio", options: ["sans", "mono"], description: "--nf-font-display for headings" } },
}
export default meta
type Story = StoryObj<Args>

function Page({ lang, display, children }: { lang: Lang; display: Args["display"]; children: React.ReactNode }) {
  const c = content[lang]
  return (
    <div lang={lang} style={display === "mono" ? ({ "--nf-font-display": "var(--font-mono)" } as React.CSSProperties) : undefined}>
      <SiteHeader
        logo={<BrandMark />}
        nav={c.nav}
        announcement={c.announcement}
        utilityLinks={c.utility}
        login={c.login}
        cta={c.cta}
        secondaryCta={c.secondaryCta}
        linkAs={DemoLink}
      />
      <main>{children}</main>
      <SiteFooter
        logo={<BrandMark />}
        tagline={c.footer.tagline}
        columns={c.footer.columns}
        legal={c.footer.legal}
        copyright={c.footer.copyright}
        locales={[{ value: "ja", label: "日本語" }, { value: "en", label: "English" }]}
        locale={lang}
        linkAs={DemoLink}
      />
    </div>
  )
}

function Landing({ lang, display }: { lang: Lang } & Args) {
  const c = content[lang]
  const [insight, connect, guard] = c.splits
  return (
    <Page lang={lang} display={display}>
      <Hero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        description={c.hero.description}
        primaryAction={c.hero.primary}
        secondaryAction={c.hero.secondary}
        note={c.hero.note}
        visual={<IsoStack blocks={isoPlatform(lang)} title={c.platform.title} />}
        linkAs={DemoLink}
      >
        <LogoCloud logos={logos} className="py-8" />
      </Hero>
      <FeatureGrid eyebrow={c.solutions.eyebrow} title={c.solutions.title} description={c.solutions.description} features={c.solutions.features} variant="card" linkAs={DemoLink} />
      <Section className="pt-0 lg:pt-0">
        <Container><DashboardShot lang={lang} /></Container>
      </Section>
      <StatsBand stats={c.stats} />
      <FeatureSplit
        items={[
          { ...insight, visual: <InsightCards lang={lang} /> },
          { ...connect, visual: <ConnectFlow lang={lang} /> },
          { ...guard, visual: <AuditShot lang={lang} /> },
        ]}
        linkAs={DemoLink}
      />
      <PlatformSection tone="muted" {...c.platform} diagram={<IsoStack blocks={isoPipeline(lang)} />} linkAs={DemoLink} />
      <CaseStudies eyebrow={c.cases.eyebrow} title={c.cases.title} items={c.cases.items} action={c.cases.all} linkAs={DemoLink} />
      <Testimonial tone="muted" {...c.testimonial} />
      <FAQ {...c.faq} linkAs={DemoLink} />
      <CTABand {...c.finalCta} primaryAction={c.finalCta.primary} secondaryAction={c.finalCta.secondary} linkAs={DemoLink} />
    </Page>
  )
}

export const LandingJa: Story = { name: "Landing (ja)", render: (a) => <Landing lang="ja" {...a} /> }
export const LandingEn: Story = { name: "Landing (en)", render: (a) => <Landing lang="en" {...a} />, globals: { locale: "en" } }
export const LandingMono: Story = { name: "Landing (ja, mono display)", args: { display: "mono" }, render: (a) => <Landing lang="ja" {...a} /> }

export const PricingPage: Story = {
  name: "Pricing (ja)",
  render: (a) => {
    const c = content.ja
    const p = pricing.ja
    return (
      <Page lang="ja" display={a.display}>
        <PricingTable
          eyebrow="料金プラン"
          title="チームの規模に合わせて選べる料金"
          description="すべてのプランで14日間の無料トライアルをご利用いただけます。途中でのプラン変更も可能です。"
          tiers={p.tiers}
          yearlyBadge="年払いで2か月分お得"
          footnote="表示価格はすべて税抜です。"
          linkAs={DemoLink}
        />
        <PricingComparison title="プラン別の機能比較" tiers={p.tiers} groups={p.comparison} yesLabel="利用可" noLabel="利用不可" />
        <FAQ {...c.faq} linkAs={DemoLink} />
        <CTABand variant="compact" title="最適なプランをご提案します" description="ご利用人数や要件をお聞かせください。" primaryAction={{ label: "お問い合わせ", href: "/contact" }} secondaryAction={{ label: "資料をダウンロード", href: "#" }} linkAs={DemoLink} />
      </Page>
    )
  },
}

const guardFeatures = [
  { icon: KeyRound, title: "きめ細かな権限", description: "ロール・属性・データ単位で、見せる情報と操作を細かく制御できます。" },
  { icon: ScrollText, title: "改ざんできない監査ログ", description: "すべての操作を記録し、検索・エクスポートできます。保存期間も選べます。" },
  { icon: Fingerprint, title: "SSO・SCIM", description: "既存の ID 基盤と連携し、入退社に合わせてアカウントを自動で管理します。" },
  { icon: Eye, title: "外部共有の統制", description: "共有リンクに期限・IP 制限をかけ、誰がいつ閲覧したかを記録します。" },
  { icon: BellRing, title: "リスクの自動検知", description: "大量ダウンロードや深夜のアクセスなど、普段と違う操作を通知します。" },
  { icon: FileCheck2, title: "監査レポート", description: "監査で求められる権限一覧・操作履歴を、ワンクリックで出力できます。" },
]

export const ProductPage: Story = {
  name: "Product · Guard (ja)",
  render: (a) => {
    const c = content.ja
    return (
      <Page lang="ja" display={a.display}>
        <Hero
          variant="centered"
          tone="default"
          announcement={{ tag: "新機能", label: "監査ログのエクスポートに対応しました", href: "#" }}
          eyebrow="Nagiflow Guard"
          title="統制を、業務のスピードを落とさずに。"
          description="きめ細かな権限管理と改ざんできない監査ログで、内部統制・監査対応を仕組みで支えます。"
          primaryAction={{ label: "無料で試す", href: "/signup" }}
          secondaryAction={{ label: "セキュリティ資料を請求", href: "#" }}
          visual={<AuditShot />}
          linkAs={DemoLink}
        />
        <LogoCloud title="監査対応の厳しい業界でも採用されています" logos={logos} className="border-y" />
        <PlatformSection
          eyebrow="多層防御"
          title="データを守る、4つのレイヤー"
          description="インフラから操作ログまで、すべての層でセキュリティを確保しています。"
          layers={[
            { name: "インフラ", description: "国内リージョンでの冗長構成" },
            { name: "暗号化", description: "保存時・通信時ともに暗号化" },
            { name: "アクセス制御", description: "ロール・属性ベースの権限管理" },
            { name: "監査", description: "すべての操作を記録・エクスポート" },
          ]}
          diagram={<IsoStack blocks={isoLayers("ja")} />}
        />
        <FeatureGrid
          tone="muted"
          eyebrow="主な機能"
          title="監査担当者にも、現場にもやさしい"
          columns={3}
          features={guardFeatures}
        />
        <Testimonial {...c.testimonial} />
        <CTABand {...c.finalCta} primaryAction={c.finalCta.primary} secondaryAction={c.finalCta.secondary} linkAs={DemoLink} />
      </Page>
    )
  },
}
