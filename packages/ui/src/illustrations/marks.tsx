import * as React from "react"
import { cn } from "../lib/utils.ts"

/** Placeholder brand mark until the final logo exists: two calm "flow" strokes in a tile. */
export function BrandMark({ name = "nagiflow", className, showName = true }: { name?: string; className?: string; showName?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-semibold tracking-tight", className)}>
      <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden>
        <rect width="24" height="24" rx="6" style={{ fill: "var(--primary)" }} />
        <path d="M5 10c2.3-2 4.7-2 7 0s4.7 2 7 0M5 15c2.3-2 4.7-2 7 0s4.7 2 7 0" fill="none" strokeWidth="1.8" strokeLinecap="round" style={{ stroke: "var(--primary-foreground)" }} />
      </svg>
      {showName && <span className="text-[17px] leading-none">{name}</span>}
    </span>
  )
}

const shapes: ((c: string) => React.ReactNode)[] = [
  (c) => <circle cx="10" cy="10" r="8" fill="none" stroke={c} strokeWidth="3" />,
  (c) => <path d="M10 2 18 18H2Z" fill={c} />,
  (c) => <><rect x="2" y="2" width="7" height="7" fill={c} /><rect x="11" y="11" width="7" height="7" fill={c} /></>,
  (c) => <path d="M2 14c4-8 12-8 16 0" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" />,
  (c) => <><rect x="2" y="3" width="16" height="3" fill={c} /><rect x="2" y="9" width="11" height="3" fill={c} /><rect x="2" y="15" width="6" height="3" fill={c} /></>,
  (c) => <path d="M10 2 18 10 10 18 2 10Z" fill="none" stroke={c} strokeWidth="3" />,
  (c) => <><circle cx="6" cy="10" r="4" fill={c} /><circle cx="14" cy="10" r="4" fill="none" stroke={c} strokeWidth="2.5" /></>,
  (c) => <path d="M3 17V3l14 14V3" fill="none" stroke={c} strokeWidth="3" strokeLinejoin="round" />,
]

/** Monochrome wordmark for fictional customer logos (logo walls, case studies). */
export function PlaceholderLogo({ name, variant = 0, className }: { name: string; variant?: number; className?: string }) {
  const c = "currentColor"
  return (
    <span className={cn("inline-flex items-center gap-2 text-[17px] font-semibold tracking-tight whitespace-nowrap", className)}>
      <svg viewBox="0 0 20 20" className="size-5 shrink-0" aria-hidden>{shapes[variant % shapes.length](c)}</svg>
      {name}
    </span>
  )
}

/** Icon in a tinted tile — feature lists, product cards. */
export function IconTile({ children, tone = "brand", className }: { children: React.ReactNode; tone?: "brand" | "neutral" | "inverse"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-md [&_svg]:size-5",
        tone === "brand" && "bg-accent text-accent-foreground",
        tone === "neutral" && "border bg-background text-foreground",
        tone === "inverse" && "bg-foreground text-background",
        className,
      )}
    >
      {children}
    </span>
  )
}
