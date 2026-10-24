import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../../index.ts"
import { BarChart, DescriptionList, LineChart, PageHeader, StatGrid } from "../../blocks/dashboard/index.ts"
import { throughput, weeks, workload } from "../fixtures/dashboard.ts"
import { DemoLink } from "./demo-shell.tsx"

const meta: Meta = { title: "Dashboard/Blocks" }
export default meta

export const PageHeaderBlock: StoryObj = {
  name: "PageHeader",
  render: () => (
    <PageHeader linkAs={DemoLink} breadcrumb={[{ label: "プロジェクト", href: "/projects" }, { label: "会員基盤のリニューアル" }]}
      title="会員基盤のリニューアル" description="ページタイトルは必ずナビゲーションの名称と一致させます。" secondaryActions={<Button variant="secondary">共有</Button>} primaryAction={<Button>編集</Button>} />
  ),
}

export const Stats: StoryObj = {
  name: "StatGrid",
  render: () => (
    <StatGrid stats={[
      { label: "売上", value: "¥12.4M", delta: 8.2, period: "前月比", trend: throughput.completed },
      { label: "解約率", value: "1.8%", delta: 0.4, upIsGood: false, period: "前月比" },
      { label: "新規契約", value: "42", delta: -5, period: "前月比" },
      { label: "NPS", value: "38", delta: 0, period: "前月比" },
    ]} />
  ),
}

export const Charts: StoryObj = {
  render: () => (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card><CardHeader><CardTitle>完了タスク（単一系列）</CardTitle></CardHeader><CardContent><LineChart label="完了タスク" labels={weeks} series={[{ name: "完了", data: throughput.completed }]} /></CardContent></Card>
      <Card><CardHeader><CardTitle>新規と完了（2系列）</CardTitle></CardHeader><CardContent><LineChart label="新規と完了" labels={weeks} series={[{ name: "完了", data: throughput.completed }, { name: "新規", data: throughput.created }]} /></CardContent></Card>
      <Card><CardHeader><CardTitle>部署別の稼働時間</CardTitle></CardHeader><CardContent><BarChart label="部署別の稼働時間" data={workload} format={(v) => `${v}時間`} /></CardContent></Card>
    </div>
  ),
}

export const Descriptions: StoryObj = {
  name: "DescriptionList",
  render: () => (
    <Card className="max-w-2xl"><CardContent className="pt-6">
      <DescriptionList items={[{ label: "責任者", value: "高橋 健太" }, { label: "部署", value: "プロダクト開発部" }, { label: "期限", value: "2026/12/18" }, { label: "予算", value: "¥18,500,000" }, { label: "備考", value: undefined }]} />
    </CardContent></Card>
  ),
}
