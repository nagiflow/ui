/**
 * Product "screenshots" for the marketing stories, rendered from real library components.
 * Swap these for your own product's screens.
 */
import * as React from "react"
import { BarChart3, Cable, Database, FileSpreadsheet, FolderKanban, Home, Layers, Mail, MessageSquare, Settings, ShieldCheck, Users, Workflow, Warehouse, Webhook } from "lucide-react"
import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Avatar } from "../../index.ts"
import { AppShell, LineChart, BarChart, PageContainer, PageHeader, StatGrid } from "../../blocks/dashboard/index.ts"
import { BrandMark, FlowDiagram, ProductFrame } from "../../illustrations/index.ts"

type Lang = "ja" | "en"
const L = <T,>(lang: Lang, ja: T, en: T) => (lang === "ja" ? ja : en)

function Shell({ lang, path, children }: { lang: Lang; path: string; children: React.ReactNode }) {
  return (
    <AppShell
      brand={<BrandMark className="text-[15px]" />}
      workspace={L(lang, "ナギフロー デモ株式会社", "Nagiflow Demo Inc.")}
      nav={[
        {
          items: [
            { label: L(lang, "ホーム", "Home"), href: "/", icon: <Home /> },
            { label: L(lang, "ダッシュボード", "Dashboards"), href: "/insight", icon: <BarChart3 /> },
            { label: L(lang, "ワークフロー", "Workflows"), href: "/flow", icon: <Workflow /> },
            { label: L(lang, "連携", "Integrations"), href: "/connect", icon: <Cable /> },
            { label: L(lang, "プロジェクト", "Projects"), href: "/projects", icon: <FolderKanban /> },
          ],
        },
        { label: L(lang, "管理", "Admin"), items: [{ label: L(lang, "メンバー", "Members"), href: "/members", icon: <Users /> }, { label: L(lang, "監査ログ", "Audit log"), href: "/audit", icon: <ShieldCheck /> }] },
      ]}
      footerNav={[{ label: L(lang, "設定", "Settings"), href: "/settings", icon: <Settings /> }]}
      currentPath={path}
      user={{ name: L(lang, "佐藤 美咲", "Misaki Sato"), email: "misaki.sato@example.com" }}
      notificationCount={3}
      onSearch={() => {}}
    >
      {children}
    </AppShell>
  )
}

const weeks = ["9/1", "9/8", "9/15", "9/22", "9/29", "10/6", "10/13", "10/20"]

export function InsightScreen({ lang = "ja" }: { lang?: Lang }) {
  return (
    <Shell lang={lang} path="/insight">
      <PageContainer>
        <PageHeader title={L(lang, "ダッシュボード", "Dashboards")} description={L(lang, "全社の主要指標（10月25日時点）", "Company-wide KPIs as of Oct 25")} />
        <StatGrid
          stats={[
            { label: L(lang, "月次売上", "Monthly revenue"), value: L(lang, "¥48.2M", "$482K"), delta: 8.4, period: L(lang, "前月比", "vs last month"), trend: [30, 32, 31, 35, 38, 37, 41, 44] },
            { label: L(lang, "処理済みの申請", "Requests processed"), value: "1,284", delta: 12.1, period: L(lang, "前週比", "vs last week") },
            { label: L(lang, "平均承認時間", "Avg. approval time"), value: L(lang, "4.2時間", "4.2 h"), delta: -18, upIsGood: false, period: L(lang, "前週比", "vs last week") },
            { label: L(lang, "同期エラー", "Sync errors"), value: "2", delta: -60, upIsGood: false, period: L(lang, "前週比", "vs last week") },
          ]}
        />
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_360px] gap-6">
          <Card>
            <CardHeader><div><CardTitle>{L(lang, "申請と承認の推移", "Requests vs approvals")}</CardTitle><CardDescription>{L(lang, "週ごとの件数", "Weekly count")}</CardDescription></div></CardHeader>
            <CardContent>
              <LineChart label="trend" labels={weeks} series={[{ name: L(lang, "承認", "Approved"), data: [180, 196, 210, 205, 232, 248, 251, 270] }, { name: L(lang, "申請", "Submitted"), data: [210, 220, 228, 240, 238, 260, 266, 281] }]} height={220} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><div><CardTitle>{L(lang, "部門別の自動化率", "Automation by team")}</CardTitle><CardDescription>%</CardDescription></div></CardHeader>
            <CardContent>
              <BarChart label="automation" height={220} data={[{ label: L(lang, "経理", "Finance"), value: 82 }, { label: L(lang, "人事", "HR"), value: 74 }, { label: L(lang, "営業", "Sales"), value: 61 }, { label: L(lang, "物流", "Ops"), value: 55 }]} format={(v) => `${v}%`} />
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </Shell>
  )
}

const audit = [
  ["佐藤 美咲", "Misaki Sato", "ワークフロー「経費精算」を更新", "Updated workflow “Expense claims”", "10:42", "brand"],
  ["鈴木 健", "Ken Suzuki", "メンバー 3名を「経理」ロールに追加", "Added 3 members to role “Finance”", "10:18", "neutral"],
  ["System", "System", "連携「会計システム」の同期が完了", "Sync “Accounting” completed", "09:55", "success"],
  ["高橋 彩", "Aya Takahashi", "ダッシュボードを外部共有（期限つき）", "Shared a dashboard externally (expiring)", "09:31", "warning"],
  ["田中 翔", "Sho Tanaka", "APIキーを再発行", "Rotated an API key", "09:02", "neutral"],
  ["佐藤 美咲", "Misaki Sato", "SSO 設定を変更", "Changed SSO settings", "08:47", "brand"],
] as const

export function AuditScreen({ lang = "ja" }: { lang?: Lang }) {
  return (
    <Shell lang={lang} path="/audit">
      <PageContainer>
        <PageHeader title={L(lang, "監査ログ", "Audit log")} description={L(lang, "ワークスペース内のすべての操作の記録です。", "Every action taken in this workspace.")} />
        <Card>
          <Table>
            <TableHeader>
              <TableRow><TableHead>{L(lang, "日時", "Time")}</TableHead><TableHead>{L(lang, "ユーザー", "User")}</TableHead><TableHead>{L(lang, "操作", "Action")}</TableHead><TableHead>{L(lang, "区分", "Type")}</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {audit.map(([nj, ne, aj, ae, time, tone], i) => (
                <TableRow key={i}>
                  <TableCell className="text-muted-foreground tabular-nums">10/25 {time}</TableCell>
                  <TableCell><span className="flex items-center gap-2"><Avatar name={L(lang, nj, ne)} className="size-6" />{L(lang, nj, ne)}</span></TableCell>
                  <TableCell>{L(lang, aj, ae)}</TableCell>
                  <TableCell>
                    <Badge variant={tone}>{{ brand: L(lang, "設定", "Config"), neutral: L(lang, "権限", "Access"), success: L(lang, "連携", "Sync"), warning: L(lang, "共有", "Share") }[tone]}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </PageContainer>
    </Shell>
  )
}

export const DashboardShot = ({ lang = "ja" }: { lang?: Lang }) => (
  <ProductFrame url="app.nagiflow.example/insight" label={L(lang, "ダッシュボード画面", "Dashboard screen")}>
    <InsightScreen lang={lang} />
  </ProductFrame>
)

export const AuditShot = ({ lang = "ja" }: { lang?: Lang }) => (
  <ProductFrame url="app.nagiflow.example/audit" height={640} label={L(lang, "監査ログ画面", "Audit log screen")}>
    <AuditScreen lang={lang} />
  </ProductFrame>
)

export const ConnectFlow = ({ lang = "ja" }: { lang?: Lang }) => (
  <div className="rounded-xl border bg-card p-6 sm:p-8">
    <FlowDiagram
      title={L(lang, "データ連携の流れ", "How data flows")}
      sources={[
        { label: L(lang, "会計システム", "Accounting"), sublabel: L(lang, "15分ごとに同期", "Every 15 min"), icon: Database },
        { label: L(lang, "人事システム", "HR system"), sublabel: L(lang, "差分同期", "Incremental"), icon: Users },
        { label: L(lang, "スプレッドシート", "Spreadsheets"), sublabel: L(lang, "ファイル取込", "File import"), icon: FileSpreadsheet },
        { label: "Webhook", sublabel: L(lang, "リアルタイム", "Real time"), icon: Webhook },
      ]}
      hub={{ label: "Nagiflow Core", sublabel: "Unified data", icon: Layers }}
      targets={[
        { label: L(lang, "ダッシュボード", "Dashboards"), icon: BarChart3 },
        { label: L(lang, "チャット通知", "Chat alerts"), icon: MessageSquare },
        { label: L(lang, "メール配信", "Email digests"), icon: Mail },
        { label: L(lang, "データウェアハウス", "Warehouse"), icon: Warehouse },
      ]}
    />
  </div>
)

/** A frameless composition: KPI tiles over a chart card. Lighter than a full screenshot. */
export const InsightCards = ({ lang = "ja" }: { lang?: Lang }) => (
  <div className="relative pb-10 sm:pr-10">
    <Card className="shadow-[0_24px_48px_-24px_rgb(0_0_0/0.2)]">
      <CardHeader><div><CardTitle>{L(lang, "申請と承認の推移", "Requests vs approvals")}</CardTitle><CardDescription>{L(lang, "週ごとの件数", "Weekly count")}</CardDescription></div></CardHeader>
      <CardContent>
        <LineChart label="trend" labels={weeks} series={[{ name: L(lang, "承認", "Approved"), data: [180, 196, 210, 205, 232, 248, 251, 270] }, { name: L(lang, "申請", "Submitted"), data: [210, 220, 228, 240, 238, 260, 266, 281] }]} height={200} />
      </CardContent>
    </Card>
    <StatGrid
      className="absolute right-0 bottom-0 hidden w-72 grid-cols-1! shadow-[0_24px_48px_-16px_rgb(0_0_0/0.25)] sm:grid"
      stats={[{ label: L(lang, "平均承認時間", "Avg. approval time"), value: L(lang, "4.2時間", "4.2 h"), delta: -18, upIsGood: false, period: L(lang, "前週比", "vs last week"), trend: [9, 8, 8, 7, 6, 5, 5, 4] }]}
    />
  </div>
)
