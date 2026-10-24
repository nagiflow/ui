import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { MoreHorizontal, Pencil } from "lucide-react"
import {
  Avatar, Badge, Button, Card, CardContent, CardHeader, CardTitle, Checkbox, ConfirmDialog, DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger, Progress, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tabs, TabsContent, TabsList, TabsTrigger,
} from "../../index.ts"
import { DescriptionList, DetailLayout, PageContainer, PageHeader } from "../../blocks/dashboard/index.ts"
import { activity, members, projectStatus, projects, tasks, yen } from "../fixtures/dashboard.ts"
import { DemoLink, DemoShell } from "./demo-shell.tsx"

const meta: Meta = { title: "Dashboard/Pages/Project detail", parameters: { layout: "fullscreen" } }
export default meta

const p = projects[0]

function ProjectDetail() {
  const [deleting, setDeleting] = React.useState(false)
  return (
    <DemoShell currentPath={`/projects/${p.id}`}>
      <PageContainer>
        <ConfirmDialog
          open={deleting}
          onOpenChange={setDeleting}
          title={`「${p.name}」を削除しますか？`}
          description={`${p.openTasks}件のタスクとファイルもすべて削除されます。この操作は取り消せません。`}
          confirmLabel="削除する"
        />
        <Tabs defaultValue="overview">
          <PageHeader
            linkAs={DemoLink}
            breadcrumb={[{ label: "プロジェクト", href: "/projects" }, { label: p.name }]}
            title={p.name}
            meta={<><Badge variant={projectStatus[p.status].variant}>{projectStatus[p.status].label}</Badge><span className="font-mono text-xs text-muted-foreground">{p.id}</span></>}
            secondaryActions={
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="secondary" size="icon" aria-label="その他の操作"><MoreHorizontal /></Button></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>複製</DropdownMenuItem>
                  <DropdownMenuItem>アーカイブ</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem destructive onSelect={() => setDeleting(true)}>プロジェクトを削除</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            }
            primaryAction={<Button><Pencil />編集</Button>}
            tabs={
              <TabsList>
                <TabsTrigger value="overview">概要</TabsTrigger>
                <TabsTrigger value="tasks">タスク <span className="ml-1 text-xs tabular-nums text-muted-foreground">{p.openTasks}</span></TabsTrigger>
                <TabsTrigger value="members">メンバー</TabsTrigger>
                <TabsTrigger value="history">履歴</TabsTrigger>
              </TabsList>
            }
          />
          <TabsContent value="overview">
            <DetailLayout
              main={
                <>
                  <Card>
                    <CardHeader><CardTitle>概要</CardTitle></CardHeader>
                    <CardContent className="text-sm leading-relaxed">
                      会員情報を管理する基盤を新しい構成に移行し、ログイン・会員登録・退会の各フローを統一します。
                      旧システムは2027年1月末に停止予定です。移行期間中はデータを双方向に同期します。
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>直近のタスク</CardTitle>
                      <Button variant="link" size="sm">すべて見る</Button>
                    </CardHeader>
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-12"><span className="sr-only">完了</span></TableHead>
                          <TableHead>タスク</TableHead>
                          <TableHead className="hidden sm:table-cell">担当者</TableHead>
                          <TableHead>優先度</TableHead>
                          <TableHead numeric>期限</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tasks.map((t) => (
                          <TableRow key={t.id}>
                            <TableCell className="w-12 pr-0"><Checkbox defaultChecked={t.done} aria-label={`${t.title}を完了にする`} /></TableCell>
                            <TableCell className={t.done ? "text-muted-foreground line-through" : "font-medium"}>{t.title}</TableCell>
                            <TableCell className="hidden sm:table-cell">{t.assignee}</TableCell>
                            <TableCell><Badge variant={t.priority === "高" ? "destructive" : "outline"}>{t.priority}</Badge></TableCell>
                            <TableCell numeric>{t.due}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </>
              }
              aside={
                <>
                  <Card>
                    <CardHeader><CardTitle>進捗</CardTitle></CardHeader>
                    <CardContent>
                      <div className="mb-2 flex items-baseline justify-between">
                        <span className="text-2xl font-semibold tabular-nums">{p.progress}%</span>
                        <span className="text-xs text-muted-foreground">残り{p.openTasks}タスク</span>
                      </div>
                      <Progress value={p.progress} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle>詳細</CardTitle></CardHeader>
                    <CardContent>
                      <DescriptionList columns={1} items={[
                        { label: "責任者", value: <span className="flex items-center gap-2"><Avatar name={p.owner} className="size-6" />{p.owner}</span> },
                        { label: "部署", value: p.department },
                        { label: "期間", value: <span className="tabular-nums">2026/07/01 〜 {p.due}</span> },
                        { label: "予算", value: <span className="tabular-nums">{yen(p.budget)}</span> },
                        { label: "メンバー", value: <div className="flex -space-x-1.5">{members.slice(1, 6).map((m) => <Avatar key={m.id} name={m.name} className="size-7 ring-2 ring-card" />)}</div> },
                      ]} />
                    </CardContent>
                  </Card>
                </>
              }
            />
          </TabsContent>
          <TabsContent value="tasks"><p className="text-sm text-muted-foreground">タスク一覧（Projects のテーブルと同じパターン）</p></TabsContent>
          <TabsContent value="members"><p className="text-sm text-muted-foreground">メンバー一覧</p></TabsContent>
          <TabsContent value="history">
            <ol className="grid gap-4 text-sm">
              {activity.map((a, i) => <li key={i}><span className="font-medium">{a.who}</span>さんが{a.what}<span className="ml-2 text-xs text-muted-foreground">{a.when}</span></li>)}
            </ol>
          </TabsContent>
        </Tabs>
      </PageContainer>
    </DemoShell>
  )
}

export const Default: StoryObj = { render: () => <ProjectDetail /> }
