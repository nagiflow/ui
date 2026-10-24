"use client"
import * as React from "react"
import { DefaultLink } from "../lib/link.tsx"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertTriangle, CheckCircle2, Info, XCircle, ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "../lib/utils.ts"
import { useStrings } from "../lib/locale.tsx"
import { Button } from "./button.tsx"

const alertVariants = cva("flex gap-3 rounded-md border px-4 py-3 text-sm [&>svg]:mt-0.5 [&>svg]:size-[18px] [&>svg]:shrink-0", {
  variants: {
    variant: {
      info: "border-info/30 bg-info/5 [&>svg]:text-info",
      success: "border-success/30 bg-success/5 [&>svg]:text-success",
      warning: "border-warning/60 bg-warning/10 [&>svg]:text-warning-foreground dark:[&>svg]:text-warning",
      destructive: "border-destructive/30 bg-destructive/5 [&>svg]:text-destructive",
    },
  },
  defaultVariants: { variant: "info" },
})
const alertIcons = { info: Info, success: CheckCircle2, warning: AlertTriangle, destructive: XCircle }

/** Inline message. Always say what happened AND what to do next. */
export function Alert({ variant = "info", title, children, action, className }: VariantProps<typeof alertVariants> & { title?: React.ReactNode; children?: React.ReactNode; action?: React.ReactNode; className?: string }) {
  const Icon = alertIcons[variant ?? "info"]
  return (
    <div role={variant === "destructive" ? "alert" : "status"} className={cn(alertVariants({ variant }), className)}>
      <Icon />
      <div className="flex-1 leading-relaxed">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={cn(title && "mt-0.5", "text-foreground/80")}>{children}</div>}
      </div>
      {action && <div className="shrink-0 self-center">{action}</div>}
    </div>
  )
}

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}

/** Empty state: explain why it's empty and give the one next action. */
export function EmptyState({ icon, title, description, action, className }: { icon?: React.ReactNode; title: React.ReactNode; description?: React.ReactNode; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center px-6 py-16 text-center", className)}>
      {icon && <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-6">{icon}</div>}
      <p className="text-base font-semibold">{title}</p>
      {description && <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

export type Crumb = { label: React.ReactNode; href?: string }

/** Always show where the user is. Last crumb = current page (not a link). */
export function Breadcrumb({ items, className, linkAs: Link = DefaultLink }: { items: Crumb[]; className?: string; linkAs?: React.ElementType }) {
  const t = useStrings()
  return (
    <nav aria-label={t.breadcrumb} className={className}>
      <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="size-3.5 opacity-60" aria-hidden />}
            {c.href && i < items.length - 1 ? (
              <Link href={c.href} className="hover:text-foreground hover:underline">{c.label}</Link>
            ) : (
              <span aria-current={i === items.length - 1 ? "page" : undefined} className={cn(i === items.length - 1 && "text-foreground")}>{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function Pagination({ page, pageSize, total, onPageChange, className }: { page: number; pageSize: number; total: number; onPageChange?: (page: number) => void; className?: string }) {
  const t = useStrings()
  const last = Math.max(1, Math.ceil(total / pageSize))
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(total, page * pageSize)
  return (
    <nav aria-label={t.pagination} className={cn("flex items-center justify-between gap-4 text-sm", className)}>
      <p className="text-muted-foreground tabular-nums">{t.of(from, to, total)}</p>
      <div className="flex items-center gap-1">
        <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => onPageChange?.(page - 1)}><ChevronLeft />{t.previous}</Button>
        <span className="px-3 tabular-nums">{page} / {last}</span>
        <Button variant="secondary" size="sm" disabled={page >= last} onClick={() => onPageChange?.(page + 1)}>{t.next}<ChevronRight /></Button>
      </div>
    </nav>
  )
}
