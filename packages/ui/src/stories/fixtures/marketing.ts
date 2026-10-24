/**
 * Dummy marketing content for a fictional nagiflow product suite.
 * Every company, person and number here is invented.
 */
import {
  Activity, BarChart3, Blocks, BookOpen, Bot, Building2, Cable, FileCheck2, Gauge, GitBranch, Landmark, LifeBuoy,
  LockKeyhole, Newspaper, Factory, ShieldCheck, ShoppingBag, Stethoscope, Workflow, Users, Zap, Layers, type LucideIcon,
} from "lucide-react"
import type { IsoBlock } from "../../illustrations/iso-stack.tsx"
import type { SiteNavItem } from "../../blocks/marketing/site-header.tsx"
import type { PricingTier, ComparisonGroup } from "../../blocks/marketing/pricing.tsx"

export const logos = [
  { name: "Halvora", variant: 0 },
  { name: "Monoweave", variant: 4 },
  { name: "Quillstone", variant: 1 },
  { name: "Tessaro", variant: 2 },
  { name: "Orinami", variant: 3 },
  { name: "Vaskel", variant: 5 },
  { name: "Brightfold", variant: 6 },
  { name: "Kumoya", variant: 7 },
]

/* ---------------- Isometric presets ---------------- */

const T = 3.4 // top layer elevation
export const isoPlatform = (lang: "ja" | "en"): IsoBlock[] => {
  const ja = lang === "ja"
  const plates = [
    ["Connect", ja ? "データ連携" : "Integrations"],
    ["Pipelines", ja ? "取り込み・変換" : "Ingest & transform"],
    ["Search", ja ? "横断検索" : "Unified search"],
    ["Assist", ja ? "AIアシスタント" : "AI assistant"],
    ["Audit", ja ? "監査ログ" : "Audit trail"],
  ]
  return [
    { x: 0, y: 0, w: 3, d: 8, h: 2.6, tone: "brand", label: "Nagiflow Core", sublabel: ja ? "統合データ基盤" : "Unified data layer", side: "left" },
    ...plates.map(([label, sublabel], i): IsoBlock => ({ x: 3.5 + i * 1.15, y: 0, w: 0.75, d: 8, h: 2.6 - i * 0.18, tone: "paper", label, sublabel, side: "right" })),
    { x: -0.4, y: -0.4, z: T, w: 9.6, d: 8.8, h: 0, tone: "outline" },
    { x: 0.4, y: 4.6, z: T, w: 3, d: 3, h: 3, tone: "accent2", label: "Nagiflow Flow", sublabel: ja ? "ワークフロー自動化" : "Workflow automation", side: "left" },
    { x: 3.2, y: 2.2, z: T, w: 3, d: 3, h: 3, tone: "ghost", label: "Your stack", sublabel: ja ? "独自の業務アプリを構築" : "Build your own apps", side: "right" },
    { x: 5.8, y: 0.4, z: T, w: 3, d: 3, h: 3, tone: "accent", label: "Nagiflow Insight", sublabel: ja ? "分析・可視化" : "Analytics", side: "right" },
  ]
}

export const isoPipeline = (lang: "ja" | "en"): IsoBlock[] => {
  const ja = lang === "ja"
  return [
    { x: 0, y: 0, w: 2, d: 2, h: 1, tone: "paper", label: "Sources", sublabel: ja ? "SaaS・DB・ファイル" : "SaaS, DBs, files", side: "left" },
    { x: 0, y: 3, w: 2, d: 2, h: 1, tone: "paper" },
    { x: 0, y: 6, w: 2, d: 2, h: 1, tone: "paper" },
    { x: 3.5, y: 1.5, w: 3, d: 5, h: 1.6, tone: "brand", label: "Connect", sublabel: ja ? "取り込み・正規化" : "Ingest & normalize", side: "left" },
    { x: 8, y: 1.5, w: 3, d: 5, h: 3.2, tone: "ink", label: "Core", sublabel: ja ? "統合データ基盤" : "Unified data layer", side: "left" },
    { x: 12.5, y: -1, w: 2.4, d: 2.4, h: 2.4, tone: "accent", label: "Insight", sublabel: ja ? "ダッシュボード" : "Dashboards", side: "right" },
    { x: 12.5, y: 6, w: 2.4, d: 2.4, h: 2.4, tone: "accent2", label: "Flow", sublabel: ja ? "自動化" : "Automation", side: "right" },
  ]
}

export const isoLayers = (lang: "ja" | "en"): IsoBlock[] => {
  const ja = lang === "ja"
  const layers: [string, string, IsoBlock["tone"]][] = [
    ["Infrastructure", ja ? "国内リージョン・冗長化" : "Regional, redundant hosting", "paper"],
    ["Encryption", ja ? "保存時・通信時の暗号化" : "At rest and in transit", "neutral"],
    ["Access control", ja ? "ロール・属性ベースの権限" : "Role & attribute based", "brand"],
    ["Audit", ja ? "すべての操作を記録" : "Every action recorded", "ink"],
  ]
  return [
    ...layers.map(([label, sublabel, tone], i): IsoBlock => ({ x: 0, y: 0, z: i * 1.5, w: 7, d: 7, h: 0.7, tone, label, sublabel, side: i % 2 ? "left" : "right" })),
    { x: 2.25, y: 2.25, z: 6, w: 2.5, d: 2.5, h: 2.5, tone: "ghost", label: "Your data", sublabel: ja ? "お客様のデータ" : "Stays yours", side: "right" },
  ]
}

/* ---------------- Copy ---------------- */

type Feature = { icon: LucideIcon; title: string; description: string; action?: { label: string; href: string } }

export const content = {
  ja: {
    nav: [
      {
        label: "製品",
        groups: [
          {
            title: "プラットフォーム",
            items: [
              { title: "Nagiflow Core", description: "業務データをひとつに集約する統合基盤", href: "/core", icon: Layers },
              { title: "Nagiflow Connect", description: "300以上のサービスとノーコードで連携", href: "/connect", icon: Cable },
              { title: "Nagiflow Flow", description: "承認・通知・転記をワークフローで自動化", href: "/flow", icon: Workflow },
            ],
          },
          {
            title: "活用",
            items: [
              { title: "Nagiflow Insight", description: "経営指標をリアルタイムに可視化", href: "/insight", icon: BarChart3 },
              { title: "Nagiflow Assist", description: "社内データに基づいて答えるAIアシスタント", href: "/assist", icon: Bot },
              { title: "Nagiflow Guard", description: "権限管理と監査ログで統制を効かせる", href: "/guard", icon: ShieldCheck },
            ],
          },
        ],
        featured: { eyebrow: "新機能", title: "AIアシスタントが一般提供を開始", description: "社内のデータに基づいて、根拠つきで回答します。", action: { label: "詳しく見る", href: "/news/assist" } },
      },
      {
        label: "ソリューション",
        groups: [
          {
            title: "業種別",
            items: [
              { title: "製造", href: "/industries/manufacturing", icon: Factory },
              { title: "金融", href: "/industries/finance", icon: Landmark },
              { title: "小売・EC", href: "/industries/retail", icon: ShoppingBag },
              { title: "医療・ヘルスケア", href: "/industries/healthcare", icon: Stethoscope },
            ],
          },
          {
            title: "課題別",
            items: [
              { title: "バックオフィスの自動化", href: "/use-cases/back-office", icon: Zap },
              { title: "データ統合と分析基盤", href: "/use-cases/data", icon: Blocks },
              { title: "内部統制・監査対応", href: "/use-cases/compliance", icon: FileCheck2 },
              { title: "全社のDX推進", href: "/use-cases/dx", icon: Building2 },
            ],
          },
        ],
      },
      { label: "導入事例", href: "/customers" },
      { label: "料金", href: "/pricing" },
      {
        label: "リソース",
        groups: [
          {
            items: [
              { title: "ドキュメント", description: "セットアップからAPIリファレンスまで", href: "/docs", icon: BookOpen },
              { title: "ブログ", description: "プロダクトの最新情報と活用ノウハウ", href: "/blog", icon: Newspaper },
              { title: "サポート", description: "お困りごとはこちらから", href: "/support", icon: LifeBuoy },
              { title: "稼働状況", description: "サービスの稼働状況をリアルタイムで公開", href: "/status", icon: Activity },
            ],
          },
        ],
      },
    ] satisfies SiteNavItem[],
    announcement: { text: "年次カンファレンス「Nagiflow Day 2026」の登録受付を開始しました。", action: { label: "詳細を見る", href: "/events" } },
    utility: [{ label: "会社概要", href: "/company" }, { label: "パートナー", href: "/partners" }, { label: "サポート", href: "/support" }],
    login: { label: "ログイン", href: "/login" },
    cta: { label: "無料で試す", href: "/signup" },
    secondaryCta: { label: "お問い合わせ", href: "/contact" },
    hero: {
      eyebrow: "業務データプラットフォーム",
      title: "散らばった業務データを、ひとつの流れに。",
      description: "Nagiflow は、社内外のシステムをつなぎ、データの取り込みから承認・自動化・可視化までをひとつの基盤で完結させます。",
      primary: { label: "無料で試す", href: "/signup" },
      secondary: { label: "資料をダウンロード", href: "/resources/overview" },
      note: "14日間無料・クレジットカード登録不要",
    },
    logosTitle: "業界をリードする 1,200 社以上が Nagiflow を選んでいます",
    solutions: {
      eyebrow: "ソリューション",
      title: "連携、自動化、可視化を、ひとつの基盤で",
      description: "ツールを継ぎはぎする必要はありません。すべての機能が同じデータ・同じ権限・同じ監査ログの上で動きます。",
      features: [
        { icon: Cable, title: "データ連携", description: "SaaS・基幹システム・ファイルから、ノーコードでデータを取り込み。変更は数分で反映されます。", action: { label: "Connect の詳細", href: "/connect" } },
        { icon: Workflow, title: "ワークフロー自動化", description: "承認・通知・転記といった定型業務を、ドラッグ&ドロップで組み立てて自動化します。", action: { label: "Flow の詳細", href: "/flow" } },
        { icon: BarChart3, title: "分析・可視化", description: "集約したデータから、部門ごとのダッシュボードをすぐに作成。経営判断を待たせません。", action: { label: "Insight の詳細", href: "/insight" } },
      ] satisfies Feature[],
    },
    platform: {
      eyebrow: "プラットフォーム",
      title: "すべての業務アプリが、同じ基盤の上に",
      description: "Core に集約されたデータを、各プロダクトが共有します。新しい業務アプリも、同じ基盤の上にすばやく構築できます。",
      layers: [
        { name: "Core", description: "あらゆる業務データを、権限つきで一元管理" },
        { name: "Connect / Pipelines", description: "取り込み・変換・同期をノーコードで" },
        { name: "Flow / Insight / Assist", description: "自動化・分析・AIを同じデータの上で" },
      ],
      action: { label: "プラットフォームについて詳しく", href: "/platform" },
    },
    splits: [
      {
        eyebrow: "Nagiflow Insight",
        title: "状況がひと目でわかる、迷わないダッシュボード",
        description: "部門ごとに必要な指標だけを並べ、異常があればすぐに気づけます。グラフからそのまま明細まで掘り下げられます。",
        bullets: ["指標と明細がつながっているので、数字の根拠をすぐに確認", "部門・役職ごとに表示内容を出し分け", "定例レポートを自動で作成・配信"],
        action: { label: "Insight の詳細", href: "/insight" },
      },
      {
        eyebrow: "Nagiflow Connect",
        title: "300 以上のサービスと、コードを書かずにつながる",
        description: "会計・人事・CRM・ストレージなど、日々使っているサービスと数クリックで連携。データは自動で正規化されます。",
        bullets: ["主要な SaaS・データベースに標準対応", "差分同期で常に最新のデータを保持", "API・Webhook で独自システムとも接続"],
        action: { label: "連携サービス一覧", href: "/integrations" },
      },
      {
        eyebrow: "Nagiflow Guard",
        title: "誰が、いつ、何をしたか。すべてを記録",
        description: "細かな権限設定と改ざんできない監査ログで、内部統制と監査対応の負担を減らします。",
        bullets: ["ロール・属性ベースのきめ細かな権限管理", "すべての操作を監査ログとして保存", "SSO・SCIM による ID 管理に対応"],
        action: { label: "セキュリティについて", href: "/security" },
      },
    ],
    stats: [
      { value: "1,200+", label: "導入企業数" },
      { value: "300+", label: "連携できるサービス" },
      { value: "2週間", label: "平均導入期間" },
      { value: "99.95%", label: "稼働率（SLA）" },
    ],
    cases: {
      eyebrow: "導入事例",
      title: "業界を問わず、成果が出ています",
      items: [
        { company: "Halvora", logoVariant: 0, industry: "製造", title: "工場ごとに分かれていた生産データを統合し、月次レポートの作成を自動化", metrics: [{ value: "80%", label: "レポート作成時間の削減" }, { value: "12拠点", label: "データを統合" }], action: { label: "事例を読む", href: "/customers/halvora" } },
        { company: "Quillstone", logoVariant: 1, industry: "金融", title: "稟議・承認フローを自動化し、監査対応の工数を大幅に削減", metrics: [{ value: "3日→4時間", label: "承認リードタイム" }, { value: "60%", label: "監査工数の削減" }], action: { label: "事例を読む", href: "/customers/quillstone" } },
        { company: "Kumoya", logoVariant: 7, industry: "小売・EC", title: "店舗とECの在庫データをリアルタイムに連携し、欠品を防止", metrics: [{ value: "35%", label: "欠品率の改善" }, { value: "5分", label: "在庫データの更新間隔" }], action: { label: "事例を読む", href: "/customers/kumoya" } },
      ],
      all: { label: "すべての導入事例を見る", href: "/customers" },
    },
    testimonial: {
      quote: "部門ごとにバラバラだったデータがひとつにまとまり、会議で「どの数字が正しいのか」を議論する時間がなくなりました。意思決定のスピードがまったく違います。",
      name: "山田 太郎",
      role: "Monoweave 株式会社 執行役員 CIO",
      company: "Monoweave",
      logoVariant: 4,
      metrics: [{ value: "40%", label: "会議時間の削減" }, { value: "2.5倍", label: "施策の実行スピード" }],
    },
    faq: {
      eyebrow: "よくあるご質問",
      title: "Nagiflow について",
      description: "解決しない場合は、お気軽にお問い合わせください。",
      action: { label: "お問い合わせ", href: "/contact" },
      items: [
        { question: "導入にはどのくらいの期間がかかりますか？", answer: "標準的な構成であれば、お申し込みから2週間ほどで本番運用を開始できます。専任のカスタマーサクセスが導入を支援します。" },
        { question: "既存のシステムと連携できますか？", answer: "主要な SaaS・データベースには標準コネクタで対応しています。独自システムとも API や Webhook で連携できます。" },
        { question: "セキュリティ対策について教えてください。", answer: "通信・保存時の暗号化、ロールベースの権限管理、監査ログ、SSO に対応しています。第三者認証も取得済みです。" },
        { question: "無料トライアルはありますか？", answer: "すべての機能を14日間無料でお試しいただけます。クレジットカードの登録は不要です。" },
        { question: "料金はどのように決まりますか？", answer: "ご利用ユーザー数とプランによって決まります。詳しくは料金ページをご覧ください。" },
      ],
    },
    finalCta: {
      title: "業務データの流れを、今日から整えましょう",
      description: "14日間、すべての機能を無料でお試しいただけます。導入のご相談もお気軽にどうぞ。",
      primary: { label: "無料で試す", href: "/signup" },
      secondary: { label: "導入の相談をする", href: "/contact" },
    },
    footer: {
      tagline: "業務データをつなぎ、流れをつくるプラットフォーム。",
      columns: [
        { title: "製品", links: [{ label: "Core", href: "/core" }, { label: "Connect", href: "/connect" }, { label: "Flow", href: "/flow" }, { label: "Insight", href: "/insight" }, { label: "料金", href: "/pricing" }] },
        { title: "ソリューション", links: [{ label: "製造", href: "#" }, { label: "金融", href: "#" }, { label: "小売・EC", href: "#" }, { label: "内部統制", href: "#" }] },
        { title: "リソース", links: [{ label: "ドキュメント", href: "/docs" }, { label: "ブログ", href: "/blog" }, { label: "導入事例", href: "/customers" }, { label: "稼働状況", href: "/status" }] },
        { title: "会社", links: [{ label: "会社概要", href: "/company" }, { label: "採用情報", href: "/careers" }, { label: "セキュリティ", href: "/security" }, { label: "お問い合わせ", href: "/contact" }] },
      ],
      legal: [{ label: "利用規約", href: "/terms" }, { label: "プライバシーポリシー", href: "/privacy" }, { label: "Cookie 設定", href: "/cookies" }],
      copyright: "© 2026 nagiflow",
    },
  },
  en: {
    nav: [
      {
        label: "Products",
        groups: [
          {
            title: "Platform",
            items: [
              { title: "Nagiflow Core", description: "One governed home for operational data", href: "/core", icon: Layers },
              { title: "Nagiflow Connect", description: "300+ no-code integrations", href: "/connect", icon: Cable },
              { title: "Nagiflow Flow", description: "Automate approvals, alerts and hand-offs", href: "/flow", icon: Workflow },
            ],
          },
          {
            title: "Apps",
            items: [
              { title: "Nagiflow Insight", description: "Live dashboards for every team", href: "/insight", icon: BarChart3 },
              { title: "Nagiflow Assist", description: "An AI assistant grounded in your data", href: "/assist", icon: Bot },
              { title: "Nagiflow Guard", description: "Permissions and a complete audit trail", href: "/guard", icon: ShieldCheck },
            ],
          },
        ],
        featured: { eyebrow: "New", title: "Assist is now generally available", description: "Answers with citations, from the data you already govern.", action: { label: "Learn more", href: "/news/assist" } },
      },
      {
        label: "Solutions",
        groups: [
          { title: "By industry", items: [{ title: "Manufacturing", href: "#", icon: Factory }, { title: "Financial services", href: "#", icon: Landmark }, { title: "Retail", href: "#", icon: ShoppingBag }, { title: "Healthcare", href: "#", icon: Stethoscope }] },
          { title: "By need", items: [{ title: "Back-office automation", href: "#", icon: Zap }, { title: "Data integration", href: "#", icon: Blocks }, { title: "Compliance & audit", href: "#", icon: FileCheck2 }, { title: "Company-wide transformation", href: "#", icon: Building2 }] },
        ],
      },
      { label: "Customers", href: "/customers" },
      { label: "Pricing", href: "/pricing" },
      { label: "Docs", href: "/docs" },
    ] satisfies SiteNavItem[],
    announcement: { text: "Registration for Nagiflow Day 2026 is open.", action: { label: "See details", href: "/events" } },
    utility: [{ label: "Company", href: "/company" }, { label: "Partners", href: "/partners" }, { label: "Support", href: "/support" }],
    login: { label: "Log in", href: "/login" },
    cta: { label: "Start free trial", href: "/signup" },
    secondaryCta: { label: "Contact sales", href: "/contact" },
    hero: {
      eyebrow: "Operational data platform",
      title: "Every business system, one calm flow.",
      description: "Nagiflow connects the tools your company runs on, then takes data from ingestion through approvals, automation and analytics on a single governed platform.",
      primary: { label: "Start free trial", href: "/signup" },
      secondary: { label: "Talk to sales", href: "/contact" },
      note: "14-day free trial. No credit card required.",
    },
    logosTitle: "Trusted by 1,200+ teams across industries",
    solutions: {
      eyebrow: "Solutions",
      title: "Integrate, automate and analyze on one platform",
      description: "Stop stitching tools together. Every capability runs on the same data, the same permissions and the same audit trail.",
      features: [
        { icon: Cable, title: "Integrations", description: "Pull data from SaaS apps, core systems and files without code. Changes land in minutes.", action: { label: "Explore Connect", href: "/connect" } },
        { icon: Workflow, title: "Workflow automation", description: "Build approvals, alerts and hand-offs with drag and drop, then let them run.", action: { label: "Explore Flow", href: "/flow" } },
        { icon: BarChart3, title: "Analytics", description: "Spin up team dashboards from unified data, so decisions never wait on a spreadsheet.", action: { label: "Explore Insight", href: "/insight" } },
      ] satisfies Feature[],
    },
    platform: {
      eyebrow: "Platform",
      title: "Every business app on the same foundation",
      description: "Products share the data unified in Core, so new internal apps start with clean, governed data on day one.",
      layers: [
        { name: "Core", description: "All operational data, governed in one place" },
        { name: "Connect / Pipelines", description: "Ingest, transform and sync without code" },
        { name: "Flow / Insight / Assist", description: "Automation, analytics and AI on the same data" },
      ],
      action: { label: "Explore the platform", href: "/platform" },
    },
    splits: [
      { eyebrow: "Nagiflow Insight", title: "Dashboards that never leave you guessing", description: "Show each team only the numbers that matter and spot anomalies early. Drill from any chart straight to the underlying records.", bullets: ["Every metric links to its source records", "Views tailored by team and role", "Scheduled reports, delivered automatically"], action: { label: "Explore Insight", href: "/insight" } },
      { eyebrow: "Nagiflow Connect", title: "Connect 300+ services without writing code", description: "Link accounting, HR, CRM and storage in a few clicks. Data is normalized automatically.", bullets: ["Native connectors for major SaaS and databases", "Incremental sync keeps data fresh", "APIs and webhooks for in-house systems"], action: { label: "Browse integrations", href: "/integrations" } },
      { eyebrow: "Nagiflow Guard", title: "Who did what, and when. On the record.", description: "Fine-grained permissions and a tamper-evident audit trail take the pain out of internal controls and audits.", bullets: ["Role- and attribute-based access control", "Every action stored in the audit log", "SSO and SCIM provisioning"], action: { label: "Read about security", href: "/security" } },
    ],
    stats: [
      { value: "1,200+", label: "Companies onboard" },
      { value: "300+", label: "Integrations" },
      { value: "2 wks", label: "Average time to launch" },
      { value: "99.95%", label: "Uptime SLA" },
    ],
    cases: {
      eyebrow: "Customers",
      title: "Results across every industry",
      items: [
        { company: "Halvora", logoVariant: 0, industry: "Manufacturing", title: "Unified production data from 12 plants and automated the monthly report", metrics: [{ value: "80%", label: "less time on reporting" }, { value: "12", label: "plants unified" }], action: { label: "Read the story", href: "#" } },
        { company: "Quillstone", logoVariant: 1, industry: "Financial services", title: "Automated approval workflows and cut audit preparation dramatically", metrics: [{ value: "4 hrs", label: "approval lead time, from 3 days" }, { value: "60%", label: "less audit effort" }], action: { label: "Read the story", href: "#" } },
        { company: "Kumoya", logoVariant: 7, industry: "Retail", title: "Synced store and online inventory in real time to prevent stock-outs", metrics: [{ value: "35%", label: "fewer stock-outs" }, { value: "5 min", label: "inventory refresh" }], action: { label: "Read the story", href: "#" } },
      ],
      all: { label: "See all customer stories", href: "/customers" },
    },
    testimonial: {
      quote: "Our departments finally work from the same numbers. We no longer spend meetings arguing about which spreadsheet is right — we spend them deciding.",
      name: "Alex Morgan",
      role: "CIO, Monoweave",
      company: "Monoweave",
      logoVariant: 4,
      metrics: [{ value: "40%", label: "less time in meetings" }, { value: "2.5×", label: "faster execution" }],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions, answered",
      description: "Can't find what you're looking for? Our team is happy to help.",
      action: { label: "Contact us", href: "/contact" },
      items: [
        { question: "How long does implementation take?", answer: "Most teams go live in about two weeks, with a dedicated customer success manager guiding the rollout." },
        { question: "Can it connect to our existing systems?", answer: "Native connectors cover major SaaS apps and databases. In-house systems connect through our API and webhooks." },
        { question: "How do you keep our data secure?", answer: "Encryption in transit and at rest, role-based access, audit logs and SSO, backed by independent certifications." },
        { question: "Is there a free trial?", answer: "Yes. Every feature is free for 14 days, no credit card required." },
      ],
    },
    finalCta: {
      title: "Bring calm to your operational data, starting today",
      description: "Try every feature free for 14 days, or talk to us about your rollout.",
      primary: { label: "Start free trial", href: "/signup" },
      secondary: { label: "Talk to sales", href: "/contact" },
    },
    footer: {
      tagline: "The platform that connects operational data and keeps it flowing.",
      columns: [
        { title: "Product", links: [{ label: "Core", href: "#" }, { label: "Connect", href: "#" }, { label: "Flow", href: "#" }, { label: "Insight", href: "#" }, { label: "Pricing", href: "/pricing" }] },
        { title: "Solutions", links: [{ label: "Manufacturing", href: "#" }, { label: "Financial services", href: "#" }, { label: "Retail", href: "#" }, { label: "Compliance", href: "#" }] },
        { title: "Resources", links: [{ label: "Docs", href: "#" }, { label: "Blog", href: "#" }, { label: "Customers", href: "#" }, { label: "Status", href: "#" }] },
        { title: "Company", links: [{ label: "About", href: "#" }, { label: "Careers", href: "#" }, { label: "Security", href: "#" }, { label: "Contact", href: "#" }] },
      ],
      legal: [{ label: "Terms", href: "#" }, { label: "Privacy", href: "#" }, { label: "Cookies", href: "#" }],
      copyright: "© 2026 nagiflow",
    },
  },
}

export const pricing = {
  ja: {
    tiers: [
      { name: "Free", description: "まずは小さく試したいチームに", price: { monthly: "¥0", yearly: "¥0" }, unit: "/月", note: "3ユーザーまで", action: { label: "無料で始める", href: "/signup" }, features: ["連携サービス 3件まで", "ワークフロー 5本まで", "ダッシュボード 1件", "コミュニティサポート"] },
      { name: "Team", description: "部門の業務をまとめて自動化", price: { monthly: "¥1,800", yearly: "¥1,500" }, unit: "/ユーザー/月", note: "年払いの場合の月額換算", action: { label: "14日間無料で試す", href: "/signup?plan=team" }, featuresTitle: "Free のすべてに加えて", features: ["連携サービス 無制限", "ワークフロー 100本まで", "ダッシュボード 無制限", "メールサポート"] },
      { name: "Business", description: "全社で使うための統制とセキュリティ", price: { monthly: "¥3,600", yearly: "¥3,000" }, unit: "/ユーザー/月", note: "年払いの場合の月額換算", action: { label: "14日間無料で試す", href: "/signup?plan=business" }, featuresTitle: "Team のすべてに加えて", features: ["SSO・SCIM", "監査ログ（1年間保存）", "承認フロー・権限の詳細設定", "優先サポート"], highlighted: true, badge: "おすすめ" },
      { name: "Enterprise", description: "大規模・高度な要件に合わせて", price: "要相談", note: "年間契約", action: { label: "お問い合わせ", href: "/contact" }, featuresTitle: "Business のすべてに加えて", features: ["専用環境・国内リージョン指定", "監査ログ 無期限保存", "SLA 99.95%", "専任カスタマーサクセス"] },
    ] satisfies PricingTier[],
    comparison: [
      { title: "連携・自動化", rows: [{ label: "連携サービス数", values: ["3件", "無制限", "無制限", "無制限"] }, { label: "ワークフロー数", values: ["5本", "100本", "無制限", "無制限"] }, { label: "API・Webhook", values: [false, true, true, true] }] },
      { title: "分析", rows: [{ label: "ダッシュボード", values: ["1件", "無制限", "無制限", "無制限"] }, { label: "レポートの自動配信", values: [false, true, true, true] }] },
      { title: "セキュリティ・統制", rows: [{ label: "SSO・SCIM", values: [false, false, true, true] }, { label: "監査ログ", values: [false, "30日間", "1年間", "無期限"] }, { label: "専用環境", values: [false, false, false, true] }] },
      { title: "サポート", rows: [{ label: "サポート窓口", values: ["コミュニティ", "メール", "優先メール・チャット", "専任担当"] }, { label: "SLA", values: [false, false, "99.9%", "99.95%"] }] },
    ] satisfies ComparisonGroup[],
  },
  en: {
    tiers: [
      { name: "Free", description: "For small teams getting started", price: { monthly: "$0", yearly: "$0" }, unit: "/mo", note: "Up to 3 users", action: { label: "Get started", href: "/signup" }, features: ["3 integrations", "5 workflows", "1 dashboard", "Community support"] },
      { name: "Team", description: "Automate a department's work", price: { monthly: "$15", yearly: "$12" }, unit: "/user/mo", note: "Billed yearly", action: { label: "Start free trial", href: "#" }, featuresTitle: "Everything in Free, plus", features: ["Unlimited integrations", "100 workflows", "Unlimited dashboards", "Email support"] },
      { name: "Business", description: "Governance and security for company-wide use", price: { monthly: "$30", yearly: "$25" }, unit: "/user/mo", note: "Billed yearly", action: { label: "Start free trial", href: "#" }, featuresTitle: "Everything in Team, plus", features: ["SSO and SCIM", "1-year audit log", "Advanced approvals & permissions", "Priority support"], highlighted: true, badge: "Popular" },
      { name: "Enterprise", description: "For large-scale, advanced requirements", price: "Custom", note: "Annual contract", action: { label: "Contact sales", href: "#" }, featuresTitle: "Everything in Business, plus", features: ["Dedicated environment", "Unlimited audit retention", "99.95% SLA", "Dedicated success manager"] },
    ] satisfies PricingTier[],
  },
}

export const icons = { Gauge, GitBranch, LockKeyhole, Users, Activity }
