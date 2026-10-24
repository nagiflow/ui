import * as React from "react"
import { DefaultLink } from "../../lib/link.tsx"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { cn } from "../../lib/utils.ts"
import { Sparkline } from "./charts.tsx"

export type Stat = {
  label: string
  value: React.ReactNode
  /** Signed change, e.g. 12.5 or -3. Rendered with % unless `deltaLabel` is given. */
  delta?: number
  deltaLabel?: string
  /** Whether going up is good (revenue) or bad (overdue tasks). Default true. */
  upIsGood?: boolean
  /** "vs previous period" copy. */
  period?: string
  trend?: number[]
  href?: string
}

export function StatGrid({ stats, linkAs: Link = DefaultLink, className }: { stats: Stat[]; linkAs?: React.ElementType; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 overflow-hidden rounded-lg border bg-card sm:grid-cols-2 xl:grid-cols-4", className)}>
      {stats.map((s) => {
        const good = s.delta === undefined || s.delta === 0 ? null : (s.delta > 0) === (s.upIsGood ?? true)
        const Arrow = (s.delta ?? 0) >= 0 ? ArrowUpRight : ArrowDownRight
        const body = (
          <>
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <span className="text-[28px] leading-none font-semibold tracking-tight tabular-nums">{s.value}</span>
              {s.trend && <Sparkline data={s.trend} />}
            </div>
            {s.delta !== undefined && (
              <div className="mt-3 flex items-center gap-1.5 text-xs">
                <span className={cn("inline-flex items-center gap-0.5 font-semibold tabular-nums", good === true && "text-success", good === false && "text-destructive", good === null && "text-muted-foreground")}>
                  <Arrow className="size-3.5" aria-hidden />
                  {s.deltaLabel ?? `${s.delta > 0 ? "+" : ""}${s.delta}%`}
                </span>
                {s.period && <span className="text-muted-foreground">{s.period}</span>}
              </div>
            )}
          </>
        )
        const cell = "border-b p-5 sm:[&:nth-child(odd)]:border-r xl:border-b-0 xl:border-r xl:last:border-r-0"
        return s.href ? (
          <Link key={s.label} href={s.href} className={cn(cell, "block transition-colors hover:bg-muted/50")}>{body}</Link>
        ) : (
          <div key={s.label} className={cell}>{body}</div>
        )
      })}
    </div>
  )
}
