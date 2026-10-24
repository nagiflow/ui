import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Archive, Download, FolderKanban, Plus, UserCog } from "lucide-react"
import { Alert, Badge, Button, EmptyState, Progress } from "../../index.ts"
import { DataTable, FilterBar, PageContainer, PageHeader, type Column, type SortState } from "../../blocks/dashboard/index.ts"
import { departments, projectStatus, projects as allProjects, yen, type Project } from "../fixtures/dashboard.ts"
import { DemoLink, DemoShell } from "./demo-shell.tsx"

const meta: Meta = { title: "Dashboard/Pages/Projects", parameters: { layout: "fullscreen" } }
export default meta

const columns: Column<Project>[] = [
  {
    key: "name", header: "プロジェクト", sortable: true,
    cell: (p) => (
      <div className="min-w-48">
        <DemoLink href={`/projects/${p.id}`} className="font-medium hover:text-primary hover:underline">{p.name}</DemoLink>
        <p className="text-xs text-muted-foreground"><span className="font-mono">{p.id}</span> · {p.department}</p>
      </div>
    ),
  },
  { key: "status", header: "状態", cell: (p) => <Badge variant={projectStatus[p.status].variant}>{projectStatus[p.status].label}</Badge> },
  { key: "owner", header: "責任者", hideBelow: "md", className: "whitespace-nowrap", cell: (p) => p.owner },
  {
    key: "progress", header: "進捗", sortable: true, hideBelow: "lg",
    cell: (p) => <div className="flex items-center gap-2"><Progress value={p.progress} className="w-20" /><span className="w-9 text-right text-xs tabular-nums text-muted-foreground">{p.progress}%</span></div>,
  },
  { key: "openTasks", header: "未完了タスク", numeric: true, sortable: true, hideBelow: "lg", cell: (p) => p.openTasks },
  { key: "budget", header: "予算", numeric: true, sortable: true, hideBelow: "md", cell: (p) => yen(p.budget) },
  { key: "due", header: "期限", numeric: true, sortable: true, cell: (p) => p.due },
]

function ProjectsPage({ rows = allProjects, loading, error, empty }: { rows?: Project[]; loading?: boolean; error?: boolean; empty?: boolean }) {
  const [q, setQ] = React.useState("")
  const [status, setStatus] = React.useState("")
  const [dept, setDept] = React.useState("")
  const [sort, setSort] = React.useState<SortState>({ key: "due", dir: "asc" })
  const [page, setPage] = React.useState(1)

  const filtered = rows
    .filter((p) => (!q || p.name.includes(q) || p.id.includes(q.toUpperCase())) && (!status || p.status === status) && (!dept || p.department === dept))
    .sort((a, b) => {
      const av = a[sort.key as keyof Project], bv = b[sort.key as keyof Project]
      const c = typeof av === "number" ? av - (bv as number) : String(av).localeCompare(String(bv), "ja")
      return sort.dir === "asc" ? c : -c
    })
  const pageSize = 8
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize)

  return (
    <DemoShell currentPath="/projects">
      <PageContainer>
        <PageHeader
          title="プロジェクト"
          description="ワークスペース内のすべてのプロジェクトです。"
          secondaryActions={!empty && <Button variant="secondary"><Download />CSVで書き出す</Button>}
          primaryAction={<Button><Plus />新規プロジェクト</Button>}
        />
        {error && (
          <Alert variant="destructive" title="プロジェクトを読み込めませんでした" className="mb-4" action={<Button variant="secondary" size="sm">再読み込み</Button>}>
            通信が不安定な可能性があります。時間をおいて再読み込みしてください。
          </Alert>
        )}
        {empty ? (
          <div className="rounded-lg border border-dashed bg-card">
            <EmptyState
              icon={<FolderKanban />}
              title="まだプロジェクトがありません"
              description="プロジェクトを作成すると、タスク・担当者・期限をまとめて管理できます。"
              action={<Button><Plus />最初のプロジェクトを作成</Button>}
            />
          </div>
        ) : (
          <DataTable
            columns={columns}
            rows={error ? [] : pageRows}
            getRowId={(p) => p.id}
            loading={loading}
            selectable
            bulkActions={() => (
              <>
                <Button variant="secondary" size="sm"><UserCog />責任者を変更</Button>
                <Button variant="secondary" size="sm"><Archive />アーカイブ</Button>
              </>
            )}
            sort={sort}
            onSortChange={setSort}
            toolbar={
              <FilterBar
                search={q}
                onSearchChange={(v) => { setQ(v); setPage(1) }}
                searchPlaceholder="プロジェクト名・IDで検索"
                filters={[
                  { key: "status", label: "状態", allLabel: "すべて", value: status, onChange: (v) => { setStatus(v); setPage(1) }, options: Object.entries(projectStatus).map(([value, s]) => ({ value, label: s.label })) },
                  { key: "dept", label: "部署", allLabel: "すべて", value: dept, onChange: (v) => { setDept(v); setPage(1) }, options: departments.map((d) => ({ value: d, label: d })) },
                ]}
                onClear={() => { setQ(""); setStatus(""); setDept("") }}
              />
            }
            pagination={{ page, pageSize, total: filtered.length, onPageChange: setPage }}
          />
        )}
      </PageContainer>
    </DemoShell>
  )
}

export const Default: StoryObj = { render: () => <ProjectsPage /> }
export const Loading: StoryObj = { render: () => <ProjectsPage loading /> }
export const Empty: StoryObj = { name: "Empty (first use)", render: () => <ProjectsPage rows={[]} empty /> }
export const NoResults: StoryObj = { name: "No search results", render: () => <ProjectsPage rows={[]} /> }
export const LoadError: StoryObj = { name: "Load error", render: () => <ProjectsPage error /> }
