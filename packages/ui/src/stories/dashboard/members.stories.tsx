import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { UserPlus } from "lucide-react"
import { Avatar, Badge, Button } from "../../index.ts"
import { DataTable, FilterBar, PageContainer, PageHeader, type Column } from "../../blocks/dashboard/index.ts"
import { departments, members, memberStatusLabels, roles } from "../fixtures/dashboard.ts"
import { DemoLink, DemoShell } from "./demo-shell.tsx"

const meta: Meta = { title: "Dashboard/Pages/Members", parameters: { layout: "fullscreen" } }
export default meta

type M = (typeof members)[number]
const statusVariant = { active: "success", invited: "warning", suspended: "neutral" } as const

const columns: Column<M>[] = [
  {
    key: "name", header: "名前",
    cell: (m) => (
      <div className="flex items-center gap-3">
        <Avatar name={m.name} />
        <div className="min-w-0">
          <DemoLink href={`/members/${m.id}`} className="font-medium hover:underline">{m.name}</DemoLink>
          <p className="truncate text-xs text-muted-foreground">{m.email}</p>
        </div>
      </div>
    ),
  },
  { key: "department", header: "部署", hideBelow: "md", cell: (m) => m.department },
  { key: "role", header: "権限", cell: (m) => roles.find((r) => r.value === m.role)?.label },
  { key: "status", header: "状態", hideBelow: "sm", cell: (m) => <Badge variant={statusVariant[m.status]}>{memberStatusLabels[m.status]}</Badge> },
  { key: "lastActive", header: "最終アクセス", hideBelow: "lg", className: "text-muted-foreground", cell: (m) => m.lastActive ?? "—" },
]

function MembersPage() {
  const [q, setQ] = React.useState("")
  const [dept, setDept] = React.useState("")
  const rows = members.filter((m) => (!q || m.name.includes(q) || m.email.includes(q)) && (!dept || m.department === dept))
  return (
    <DemoShell currentPath="/members">
      <PageContainer>
        <PageHeader title="メンバー" description="このワークスペースに参加しているメンバーです。権限の変更は設定から行えます。" primaryAction={<Button><UserPlus />メンバーを招待</Button>} />
        <DataTable
          columns={columns}
          rows={rows}
          getRowId={(m) => m.id}
          toolbar={
            <FilterBar
              search={q} onSearchChange={setQ} searchPlaceholder="名前・メールアドレスで検索"
              filters={[{ key: "dept", label: "部署", allLabel: "すべて", value: dept, onChange: setDept, options: departments.map((d) => ({ value: d, label: d })) }]}
              onClear={() => { setQ(""); setDept("") }}
            />
          }
          pagination={{ page: 1, pageSize: 20, total: rows.length }}
        />
      </PageContainer>
    </DemoShell>
  )
}

export const Default: StoryObj = { render: () => <MembersPage /> }
