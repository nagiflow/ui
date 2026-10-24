import type { Meta, StoryObj } from "@storybook/react-vite"
import { Plus } from "lucide-react"
import { Button, Badge, Card, CardContent, CardDescription, CardHeader, CardTitle, Avatar, Progress, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Alert } from "../../index.ts"
import { BarChart, LineChart, PageContainer, PageHeader, StatGrid } from "../../blocks/dashboard/index.ts"
import { activity, projectStatus, projects, throughput, weeks, workload } from "../fixtures/dashboard.ts"
import { DemoLink, DemoShell } from "./demo-shell.tsx"

const meta: Meta = { title: "Dashboard/Pages/Overview", parameters: { layout: "fullscreen" } }
export default meta

const upcoming = projects.filter((p) => p.status !== "done").sort((a, b) => a.due.localeCompare(b.due)).slice(0, 5)

function Overview({ notice }: { notice?: boolean }) {
  return (
    <DemoShell currentPath="/">
      <PageContainer>
        <PageHeader
          title="ホーム"
          description="10月25日（日）時点のワークスペース全体の状況です。"
          primaryAction={<Button><Plus />新規プロジェクト</Button>}
        />
        {notice && (
          <Alert variant="warning" title="2件のプロジェクトに遅延リスクがあります" className="mb-6" action={<Button variant="secondary" size="sm">確認する</Button>}>
            進捗が予定より20%以上遅れています。担当者と期限を見直してください。
          </Alert>
        )}
        <StatGrid
          linkAs={DemoLink}
          stats={[
            { label: "進行中のプロジェクト", value: "6", delta: 2, deltaLabel: "+2件", period: "先月比", href: "/projects" },
            { label: "今週完了したタスク", value: "76", delta: 7.0, period: "前週比", trend: throughput.completed },
            { label: "期限切れのタスク", value: "9", delta: 12.5, upIsGood: false, period: "前週比" },
            { label: "平均稼働率", value: "82%", delta: -3.1, period: "前週比" },
          ]}
        />
        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>タスクの推移</CardTitle>
                <CardDescription>週ごとの新規・完了タスク数</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <LineChart label="タスクの推移" labels={weeks} series={[{ name: "完了", data: throughput.completed }, { name: "新規", data: throughput.created }]} format={(v) => `${v}件`} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div>
                <CardTitle>部署別の稼働時間</CardTitle>
                <CardDescription>今週の合計（時間）</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <BarChart label="部署別の稼働時間" data={workload} format={(v) => `${v}時間`} />
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <Card>
            <CardHeader>
              <CardTitle>期限が近いプロジェクト</CardTitle>
              <Button variant="link" size="sm" asChild><DemoLink href="/projects">すべて見る</DemoLink></Button>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>プロジェクト</TableHead>
                  <TableHead>状態</TableHead>
                  <TableHead className="hidden md:table-cell">進捗</TableHead>
                  <TableHead numeric>期限</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcoming.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <DemoLink href={`/projects/${p.id}`} className="font-medium hover:underline">{p.name}</DemoLink>
                      <p className="text-xs text-muted-foreground">{p.department}</p>
                    </TableCell>
                    <TableCell><Badge variant={projectStatus[p.status].variant}>{projectStatus[p.status].label}</Badge></TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2"><Progress value={p.progress} className="w-24" /><span className="text-xs tabular-nums text-muted-foreground">{p.progress}%</span></div>
                    </TableCell>
                    <TableCell numeric>{p.due}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <Card>
            <CardHeader><CardTitle>最近のアクティビティ</CardTitle></CardHeader>
            <CardContent>
              <ol className="grid gap-4">
                {activity.map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <Avatar name={a.who} className="size-7" />
                    <div className="min-w-0 text-sm leading-relaxed">
                      <p><span className="font-medium">{a.who}</span>さんが{a.what}</p>
                      <p className="text-xs text-muted-foreground">{a.when}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </DemoShell>
  )
}

export const Default: StoryObj = { render: () => <Overview /> }
export const WithNotice: StoryObj = { name: "With warning notice", render: () => <Overview notice /> }
