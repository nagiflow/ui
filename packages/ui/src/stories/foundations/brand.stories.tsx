import type { Meta, StoryObj } from "@storybook/react-vite"
import { ArrowRight, Check } from "lucide-react"
import { Alert, Badge, Button, Card, CardContent, CardHeader, CardTitle, Field, Input, Progress, Switch } from "../../index.ts"

const tokens = ["primary", "accent", "ring", "chart-1", "chart-2", "chart-3", "chart-4", "chart-5", "brand-surface"]

function Sample({ dark }: { dark?: boolean }) {
  return (
    <div className={dark ? "dark" : undefined}>
      <div className="flex h-full flex-col gap-4 rounded-xl border bg-background p-6 text-foreground">
        <div>
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">{dark ? "Night · 墨 Sumi" : "Day · 藍 Ai"}</p>
          <p className="mt-1 text-sm text-muted-foreground">{dark ? "目に優しいインクの闇。主要ボタンは白、フォーカスだけ朱。" : "深い藍。落ち着きと信頼、一般的な企業ブルーとは違う温度。"}</p>
        </div>
        <div className="flex gap-1">
          {tokens.map((t) => (
            <div key={t} title={t} className="h-10 flex-1 rounded-sm border" style={{ background: `var(--${t})` }} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button>保存する</Button>
          <Button variant="secondary">キャンセル</Button>
          <Button variant="link">詳しく見る <ArrowRight /></Button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="brand">進行中</Badge>
          <Badge variant="success"><Check />完了</Badge>
          <Badge variant="warning">要確認</Badge>
          <Badge variant="destructive">期限切れ</Badge>
        </div>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">今月の稼働率</CardTitle><Switch defaultChecked aria-label="通知" /></CardHeader>
          <CardContent className="grid gap-2">
            <p className="text-2xl font-semibold tabular-nums">82.4%</p>
            <Progress value={82} />
          </CardContent>
        </Card>
        <Field label="プロジェクト名" required><Input placeholder="例：新基幹システム移行" /></Field>
        <Alert variant="info" title="下書きを保存しました" />
        <div className="dark rounded-lg bg-brand-surface p-5 text-brand-surface-foreground">
          <p className="font-mono text-[11px] tracking-widest uppercase opacity-70">Platform</p>
          <p className="mt-1 text-base font-semibold">データと業務を、ひとつの流れに。</p>
          <Button size="sm" className="mt-3">無料で始める</Button>
        </div>
      </div>
    </div>
  )
}

const meta: Meta = { title: "Foundations/Brand", parameters: { layout: "fullscreen" } }
export default meta

/** Day = 藍 Ai, Night = 墨 Sumi. Toolbar "Theme" switches the whole Storybook. */
export const DayAndNight: StoryObj = {
  render: () => (
    <div className="grid gap-6 p-6">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-semibold">nagiflow color</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          昼は「藍」、夜は「墨」。プロダクトごとに変えたい場合は <code className="font-mono">:root {"{ --brand-h; --brand-c; --brand-l }"}</code> の3値だけを上書きすると、hover / ring / accent / 帯の色が追従します。チャート色は検証済みの値なので、変更する場合は dataviz validator を再実行してください。
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Sample />
        <Sample dark />
      </div>
    </div>
  ),
}
