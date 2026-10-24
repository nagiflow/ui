import * as React from "react"
import { BarChart3, Bell, CreditCard, FolderKanban, Home, ListChecks, Settings, Shield, User, Users, Building2 } from "lucide-react"
import { AppShell, PageContainer, SettingsLayout, type NavGroup, type NavItem } from "../../blocks/dashboard/index.ts"
import { currentUser, workspace } from "../fixtures/dashboard.ts"

/** Storybook can't navigate; links stay in place. Real apps pass next/link here. */
export const DemoLink = React.forwardRef<HTMLAnchorElement, React.ComponentProps<"a">>(function DemoLink(props, ref) {
  return <a ref={ref} {...props} onClick={(e) => { e.preventDefault(); props.onClick?.(e) }} />
})

export function BrandMark() {
  return (
    <>
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
        <rect width="24" height="24" rx="6" fill="var(--primary)" />
        <path d="M6.5 17V7l11 10V7" fill="none" stroke="var(--primary-foreground)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[15px] tracking-tight">nagiflow</span>
    </>
  )
}

export const nav: NavGroup[] = [
  {
    items: [
      { label: "ホーム", href: "/", icon: <Home /> },
      { label: "プロジェクト", href: "/projects", icon: <FolderKanban /> },
      { label: "タスク", href: "/tasks", icon: <ListChecks />, badge: <span className="rounded-full bg-muted px-1.5 text-[11px] font-semibold tabular-nums text-muted-foreground">12</span> },
      { label: "メンバー", href: "/members", icon: <Users /> },
    ],
  },
  { label: "分析", items: [{ label: "レポート", href: "/reports", icon: <BarChart3 /> }] },
]

export const footerNav: NavItem[] = [{ label: "設定", href: "/settings", icon: <Settings /> }]

export function DemoShell({ currentPath, children }: { currentPath: string; children: React.ReactNode }) {
  return (
    <AppShell
      brand={<BrandMark />}
      workspace={workspace}
      nav={nav}
      footerNav={footerNav}
      currentPath={currentPath}
      user={currentUser}
      notificationCount={3}
      onSearch={() => {}}
      helpHref="/help"
      accountHref="/settings/profile"
      linkAs={DemoLink}
    >
      {children}
    </AppShell>
  )
}

export const settingsNav: NavItem[] = [
  { label: "プロフィール", href: "/settings/profile", icon: <User /> },
  { label: "通知", href: "/settings/notifications", icon: <Bell /> },
  { label: "セキュリティ", href: "/settings/security", icon: <Shield /> },
  { label: "メンバー", href: "/settings/members", icon: <Users /> },
  { label: "請求", href: "/settings/billing", icon: <CreditCard /> },
  { label: "ワークスペース", href: "/settings/workspace", icon: <Building2 /> },
]

/** Settings page frame: same header + secondary nav on every settings page. */
export function SettingsPage({ path, children }: { path: string; children: React.ReactNode }) {
  return (
    <DemoShell currentPath={path}>
      <PageContainer>
        <h1 className="mb-6 text-2xl font-bold tracking-tight">設定</h1>
        <SettingsLayout title="設定" items={settingsNav} currentPath={path} linkAs={DemoLink}>{children}</SettingsLayout>
      </PageContainer>
    </DemoShell>
  )
}
