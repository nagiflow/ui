"use client"
import * as React from "react"
import { DefaultLink, useCurrentPath } from "../../lib/link.tsx"
import { Bell, CircleHelp, LogOut, Menu, Search, Settings } from "lucide-react"
import { cn } from "../../lib/utils.ts"
import { Button } from "../../components/button.tsx"
import { Dialog, DialogTitle, DialogTrigger, SheetContent } from "../../components/overlay.tsx"
import { Avatar, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/menu.tsx"
import { useDashboardStrings } from "./strings.ts"

export type NavItem = { label: string; href: string; icon?: React.ReactNode; badge?: React.ReactNode }
export type NavGroup = { label?: string; items: NavItem[] }
export type ShellUser = { name: string; email: string; avatarUrl?: string }

/** Longest href that matches the current path wins, so /projects/12 keeps "Projects" active. */
export function findActiveHref(groups: NavGroup[], currentPath = "") {
  let best = ""
  for (const g of groups)
    for (const { href } of g.items)
      if ((currentPath === href || currentPath.startsWith(href.endsWith("/") ? href : href + "/")) && href.length > best.length) best = href
  return best
}

export interface AppShellProps {
  /** Logo + product name, shown at the top of the sidebar. */
  brand: React.ReactNode
  /** Workspace / tenant name, shown under the brand so users know which org they're in. */
  workspace?: React.ReactNode
  nav: NavGroup[]
  /** Pinned to the bottom of the sidebar (e.g. Settings). */
  footerNav?: NavItem[]
  currentPath?: string
  user: ShellUser
  notificationCount?: number
  /** Omit to hide global search. */
  onSearch?: (query: string) => void
  searchPlaceholder?: string
  helpHref?: string
  accountHref?: string
  onSignOut?: () => void
  /** Extra items above "Sign out" in the user menu. */
  userMenuItems?: React.ReactNode
  linkAs?: React.ElementType
  children: React.ReactNode
  className?: string
}

export function AppShell(props: AppShellProps) {
  const { brand, workspace, nav, footerNav = [], currentPath, children, className } = props
  const t = useDashboardStrings()
  const [open, setOpen] = React.useState(false)
  const active = findActiveHref([...nav, { items: footerNav }], useCurrentPath(currentPath))

  const sidebar = (
    <SidebarNav brand={brand} workspace={workspace} nav={nav} footerNav={footerNav} active={active} linkAs={props.linkAs} onNavigate={() => setOpen(false)} label={t.mainNav} />
  )

  return (
    <div className={cn("flex min-h-svh bg-background", className)}>
      <div className="hidden w-60 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:block">
        <aside className="sticky top-0 h-svh">{sidebar}</aside>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4 sm:px-6">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="-ml-1 lg:hidden" aria-label={t.openMenu}><Menu /></Button>
            </DialogTrigger>
            <SheetContent className="bg-sidebar">
              <DialogTitle className="sr-only">{t.mainNav}</DialogTitle>
              {sidebar}
            </SheetContent>
          </Dialog>
          <div className="min-w-0 flex-1">
            {props.onSearch && (
              <form role="search" className="relative max-w-md" onSubmit={(e) => { e.preventDefault(); props.onSearch?.(String(new FormData(e.currentTarget).get("q") ?? "")) }}>
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <input name="q" type="search" aria-label={props.searchPlaceholder ?? t.searchPlaceholder} placeholder={props.searchPlaceholder ?? t.searchPlaceholder}
                  className="h-9 w-full rounded-md border border-transparent bg-muted pr-3 pl-9 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:bg-background focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring/30" />
              </form>
            )}
          </div>
          <TopBarActions {...props} />
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

function TopBarActions({ user, notificationCount = 0, helpHref, accountHref, onSignOut, userMenuItems, linkAs: Link = DefaultLink }: AppShellProps) {
  const t = useDashboardStrings()
  return (
    <div className="flex items-center gap-1">
      {helpHref && (
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href={helpHref} aria-label={t.help}><CircleHelp /></Link>
        </Button>
      )}
      <Button variant="ghost" size="icon-sm" className="relative" aria-label={t.notifications(notificationCount)}>
        <Bell />
        {notificationCount > 0 && <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="ml-1 flex cursor-pointer items-center gap-2 rounded-md p-1 hover:bg-muted" aria-label={t.account}>
            <Avatar name={user.name} src={user.avatarUrl} className="size-7" />
            <span className="hidden max-w-32 truncate text-sm font-medium md:block">{user.name}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60">
          <DropdownMenuLabel className="leading-snug">
            <span className="block text-sm font-semibold text-foreground">{user.name}</span>
            <span className="block truncate">{user.email}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {accountHref && (
            <DropdownMenuItem asChild><Link href={accountHref}><Settings />{t.accountSettings}</Link></DropdownMenuItem>
          )}
          {userMenuItems}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={onSignOut}><LogOut />{t.signOut}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function SidebarNav({ brand, workspace, nav, footerNav, active, linkAs: Link = DefaultLink, onNavigate, label }: {
  brand: React.ReactNode; workspace?: React.ReactNode; nav: NavGroup[]; footerNav: NavItem[]; active: string; linkAs?: React.ElementType; onNavigate: () => void; label: string
}) {
  const item = (it: NavItem) => {
    const isActive = it.href === active
    return (
      <li key={it.href}>
        <Link
          href={it.href}
          onClick={onNavigate}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "relative flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-foreground/5 hover:text-sidebar-foreground [&_svg]:size-[18px] [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
            isActive && "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&_svg]:text-sidebar-accent-foreground before:absolute before:inset-y-1.5 before:-left-3 before:w-[3px] before:rounded-r-full before:bg-primary",
          )}
        >
          {it.icon}
          <span className="flex-1 truncate">{it.label}</span>
          {it.badge}
        </Link>
      </li>
    )
  }
  return (
    <nav aria-label={label} className="flex h-full flex-col">
      <div className="flex h-14 shrink-0 items-center gap-2 px-5 font-semibold">{brand}</div>
      {workspace && <div className="mx-3 mb-2 truncate rounded-md border bg-background px-2.5 py-1.5 text-xs font-medium text-muted-foreground">{workspace}</div>}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        {nav.map((g, i) => (
          <div key={i} className={cn(i > 0 && "mt-5")}>
            {g.label && <p className="mb-1 px-2.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">{g.label}</p>}
            <ul className="grid gap-0.5">{g.items.map(item)}</ul>
          </div>
        ))}
      </div>
      {footerNav.length > 0 && <ul className="grid gap-0.5 border-t border-sidebar-border px-3 py-3">{footerNav.map(item)}</ul>}
    </nav>
  )
}

/** Standard page container: same width and padding on every page so content never jumps. */
export function PageContainer({ className, size = "default", ...props }: React.ComponentProps<"div"> & { size?: "default" | "narrow" | "wide" }) {
  return <div className={cn("mx-auto w-full px-4 py-6 sm:px-8 sm:py-8", size === "default" && "max-w-6xl", size === "narrow" && "max-w-3xl", size === "wide" && "max-w-none", className)} {...props} />
}
