"use client"
import * as React from "react"
import { DefaultLink, useCurrentPath } from "../../lib/link.tsx"
import { cn } from "../../lib/utils.ts"
import { findActiveHref, type NavItem } from "./app-shell.tsx"

/** Main content + right summary column. Summary moves above main on mobile so key facts come first. */
export function DetailLayout({ main, aside, className }: { main: React.ReactNode; aside: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]", className)}>
      <div className="order-2 grid min-w-0 content-start gap-6 lg:order-1">{main}</div>
      <aside className="order-1 grid content-start gap-6 lg:order-2">{aside}</aside>
    </div>
  )
}

export type DescriptionItem = { label: React.ReactNode; value: React.ReactNode }

/** Key / value pairs. `columns={1}` stacks for narrow asides. */
export function DescriptionList({ items, columns = 2, className }: { items: DescriptionItem[]; columns?: 1 | 2; className?: string }) {
  return (
    <dl className={cn("grid gap-x-8 gap-y-5", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((it, i) => (
        <div key={i} className="min-w-0">
          <dt className="text-xs font-semibold text-muted-foreground">{it.label}</dt>
          <dd className="mt-1 text-sm break-words">{it.value ?? "—"}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * One topic of a form: what + why on the left, fields on the right.
 * Stack several with dividers; never more than ~6 fields per section.
 */
export function FormSection({ title, description, children, footer, className }: { title: React.ReactNode; description?: React.ReactNode; children: React.ReactNode; footer?: React.ReactNode; className?: string }) {
  return (
    <section className={cn("grid gap-4 border-b py-8 first:pt-0 last:border-b-0 md:grid-cols-[240px_minmax(0,1fr)] md:gap-10", className)}>
      <div>
        <h2 className="text-base font-semibold leading-snug">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="grid max-w-xl content-start gap-5">
        {children}
        {footer && <div className="flex justify-end gap-2 pt-1">{footer}</div>}
      </div>
    </section>
  )
}

/** Bottom bar that stays visible on long forms. Primary action is right-most. */
export function StickyFormActions({ status, children, className }: { status?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("sticky bottom-0 z-20 -mx-4 mt-8 flex items-center justify-end gap-3 border-t bg-background/95 px-4 py-3 backdrop-blur-sm sm:-mx-8 sm:px-8", className)}>
      {status && <p className="mr-auto text-sm text-muted-foreground">{status}</p>}
      {children}
    </div>
  )
}

/** Secondary navigation for settings. Horizontal scroll on mobile, left column on desktop. */
export function SettingsLayout({ title, items, currentPath, linkAs: Link = DefaultLink, children, className }: {
  title: React.ReactNode; items: NavItem[]; currentPath?: string; linkAs?: React.ElementType; children: React.ReactNode; className?: string
}) {
  const active = findActiveHref([{ items }], useCurrentPath(currentPath))
  return (
    <div className={cn("grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-10", className)}>
      <nav aria-label={typeof title === "string" ? title : undefined}>
        <ul className="-mx-4 flex gap-1 overflow-x-auto border-b px-4 pb-2 lg:mx-0 lg:grid lg:border-0 lg:p-0">
          {items.map((it) => (
            <li key={it.href} className="shrink-0">
              <Link href={it.href} aria-current={it.href === active ? "page" : undefined}
                className={cn("flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&_svg]:size-4",
                  it.href === active && "bg-muted text-foreground")}>
                {it.icon}{it.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="min-w-0">{children}</div>
    </div>
  )
}
