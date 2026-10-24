import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "../lib/utils.ts"

export type FlowNode = { label: string; sublabel?: string; icon?: LucideIcon }

/**
 * Sources → hub → destinations. Used to explain integrations / data flow.
 * Pure SVG; scales with its container.
 */
export function FlowDiagram({
  sources,
  hub,
  targets,
  animated = true,
  className,
  title,
}: {
  sources: FlowNode[]
  hub: FlowNode
  targets: FlowNode[]
  animated?: boolean
  className?: string
  title?: string
}) {
  const W = 720
  const nodeW = 176
  const nodeH = 48
  const rowGap = 16
  const rows = Math.max(sources.length, targets.length, 3)
  const H = rows * nodeH + (rows - 1) * rowGap + 32
  const hubW = 200
  const hubH = 112
  const hubX = (W - hubW) / 2
  const hubY = (H - hubH) / 2
  const colY = (n: number, i: number) => {
    const total = n * nodeH + (n - 1) * rowGap
    return (H - total) / 2 + i * (nodeH + rowGap)
  }
  const curve = (x1: number, y1: number, x2: number, y2: number) => {
    const mx = (x1 + x2) / 2
    return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`
  }
  const node = (n: FlowNode, x: number, y: number, key: string) => {
    const Icon = n.icon
    return (
      <g key={key}>
        <rect x={x} y={y} width={nodeW} height={nodeH} rx={8} style={{ fill: "var(--card)", stroke: "var(--border)" }} />
        <rect x={x + 10} y={y + 10} width={28} height={28} rx={6} style={{ fill: "var(--muted)" }} />
        {Icon && <Icon x={x + 16} y={y + 16} width={16} height={16} strokeWidth={1.75} style={{ color: "var(--foreground)" }} />}
        <text x={x + 48} y={y + (n.sublabel ? 21 : 28)} style={{ fill: "var(--foreground)", fontSize: 13, fontWeight: 600, fontFamily: "var(--font-sans)" }}>{n.label}</text>
        {n.sublabel && <text x={x + 48} y={y + 37} style={{ fill: "var(--muted-foreground)", fontSize: 11, fontFamily: "var(--font-sans)" }}>{n.sublabel}</text>}
      </g>
    )
  }
  const HubIcon = hub.icon
  const edge = { fill: "none", stroke: "var(--primary)", strokeOpacity: 0.55 } as const

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn("h-auto w-full", className)} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <style>{`@keyframes nf-flow{to{stroke-dashoffset:-20}}.nf-flow{stroke-dasharray:4 6;animation:nf-flow 1.2s linear infinite}@media (prefers-reduced-motion:reduce){.nf-flow{animation:none}}`}</style>
      {sources.map((_, i) => (
        <path key={`se${i}`} d={curve(nodeW, colY(sources.length, i) + nodeH / 2, hubX, hubY + hubH / 2)} style={edge} strokeWidth={1.25} className={animated ? "nf-flow" : undefined} />
      ))}
      {targets.map((_, i) => (
        <path key={`te${i}`} d={curve(hubX + hubW, hubY + hubH / 2, W - nodeW, colY(targets.length, i) + nodeH / 2)} style={edge} strokeWidth={1.25} className={animated ? "nf-flow" : undefined} />
      ))}
      {sources.map((n, i) => node(n, 0, colY(sources.length, i), `s${i}`))}
      {targets.map((n, i) => node(n, W - nodeW, colY(targets.length, i), `t${i}`))}
      <rect x={hubX} y={hubY} width={hubW} height={hubH} rx={12} style={{ fill: "var(--brand-surface)" }} />
      <rect x={hubX + 0.5} y={hubY + 0.5} width={hubW - 1} height={hubH - 1} rx={11.5} style={{ fill: "none", stroke: "var(--primary)", strokeOpacity: 0.6 }} />
      {HubIcon && <HubIcon x={hubX + hubW / 2 - 12} y={hubY + 22} width={24} height={24} strokeWidth={1.75} style={{ color: "var(--brand-surface-foreground)" }} />}
      <text x={hubX + hubW / 2} y={hubY + 70} textAnchor="middle" style={{ fill: "var(--brand-surface-foreground)", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-sans)" }}>{hub.label}</text>
      {hub.sublabel && (
        <text x={hubX + hubW / 2} y={hubY + 90} textAnchor="middle" style={{ fill: "var(--brand-surface-foreground)", opacity: 0.7, fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}>{hub.sublabel.toUpperCase()}</text>
      )}
    </svg>
  )
}
