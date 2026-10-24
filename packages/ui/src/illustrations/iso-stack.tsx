"use client"
import * as React from "react"
import { cn } from "../lib/utils.ts"

/**
 * Isometric architecture diagram, drawn entirely in SVG from data.
 * Grid units: x runs to the lower-right, y to the lower-left, z up.
 * Colors come from theme tokens, so it follows palette and dark mode.
 */
export type IsoTone = "brand" | "accent" | "accent2" | "ink" | "neutral" | "paper" | "ghost" | "outline"

export type IsoBlock = {
  x: number
  y: number
  z?: number
  w: number
  d: number
  /** Height. 0 renders a flat footprint (useful for `outline`). */
  h: number
  tone?: IsoTone
  /** Uppercase mono label (product / layer name). */
  label?: string
  /** Secondary line under the label, e.g. Japanese description. */
  sublabel?: string
  side?: "left" | "right"
}

type Face = { fill: string; texture?: boolean }
const shade = (c: string, pct: number) => `color-mix(in oklch, ${c} ${100 - pct}%, black)`
const tones: Record<Exclude<IsoTone, "ghost" | "outline">, { top: Face; left: Face; right: Face }> = {
  brand: { top: { fill: "var(--card)" }, left: { fill: "var(--chart-1)", texture: true }, right: { fill: shade("var(--chart-1)", 35) } },
  accent: { top: { fill: "var(--card)" }, left: { fill: "var(--chart-3)", texture: true }, right: { fill: shade("var(--chart-3)", 50) } },
  accent2: { top: { fill: "var(--card)" }, left: { fill: "var(--chart-4)", texture: true }, right: { fill: shade("var(--chart-4)", 45) } },
  ink: { top: { fill: "var(--card)" }, left: { fill: "var(--foreground)" }, right: { fill: shade("var(--foreground)", 25) } },
  neutral: {
    top: { fill: "var(--card)" },
    left: { fill: "color-mix(in oklch, var(--card) 88%, var(--foreground))" },
    right: { fill: "color-mix(in oklch, var(--card) 76%, var(--foreground))" },
  },
  paper: {
    top: { fill: "var(--card)" },
    left: { fill: "color-mix(in oklch, var(--card) 95%, var(--foreground))" },
    right: { fill: "color-mix(in oklch, var(--card) 86%, var(--foreground))" },
  },
}

const COS = Math.cos(Math.PI / 6)
const SIN = 0.5

export function IsoStack({ showLabels = true, compactBelow = "sm", ...props }: IsoStackProps) {
  if (!showLabels || compactBelow === "never") return <IsoSvg {...props} showLabels={showLabels} />
  // Leader labels become unreadable when scaled down on phones: show the bare diagram there instead.
  return (
    <>
      <IsoSvg {...props} showLabels className={cn("hidden sm:block", props.className)} />
      <IsoSvg {...props} showLabels={false} className={cn("sm:hidden", props.className)} />
    </>
  )
}

export type IsoStackProps = {
  /** Hide leader labels below the `sm` breakpoint (default) or never. */
  compactBelow?: "sm" | "never"
  blocks: IsoBlock[]
  /** Pixel size of one grid unit inside the viewBox. */
  unit?: number
  /** Space reserved for each label column. */
  labelWidth?: number
  showLabels?: boolean
  /** Accessible title; the diagram is otherwise decorative. */
  title?: string
  className?: string
}

function IsoSvg({ blocks, unit = 32, labelWidth = 150, showLabels = true, title, className }: Omit<IsoStackProps, "compactBelow">) {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const p = (x: number, y: number, z: number) => [(x - y) * COS * unit, (x + y) * SIN * unit - z * unit] as const
  const pts = (list: (readonly [number, number])[]) => list.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ")

  // ponytail: painter's sort, layer (z) first then footprint depth. Right for stacked, non-interpenetrating blocks; use BSP if they intersect.
  const ordered = [...blocks].sort((a, b) => (a.z ?? 0) - (b.z ?? 0) || a.x + a.y - (b.x + b.y))

  const all = blocks.flatMap((b) => {
    const z = b.z ?? 0
    return [p(b.x, b.y, z), p(b.x + b.w, b.y, z), p(b.x, b.y + b.d, z), p(b.x + b.w, b.y + b.d, z), p(b.x, b.y, z + b.h), p(b.x + b.w, b.y + b.d, z + b.h)]
  })
  const minX = Math.min(...all.map((q) => q[0]))
  const maxX = Math.max(...all.map((q) => q[0]))
  const minY = Math.min(...all.map((q) => q[1]))
  const maxY = Math.max(...all.map((q) => q[1]))

  // Leader-line labels: anchor on the visible face of that side, then de-overlap per column.
  const gap = 42
  const labeled = showLabels ? blocks.filter((b) => b.label) : []
  const anchors = labeled.map((b) => {
    const z = (b.z ?? 0) + b.h / 2
    const side = b.side ?? "right"
    const [ax, ay] = side === "right" ? p(b.x + b.w, b.y + b.d / 2, z) : p(b.x + b.w / 2, b.y + b.d, z)
    return { b, side, ax, ay, ly: ay }
  })
  for (const side of ["left", "right"] as const) {
    const col = anchors.filter((a) => a.side === side).sort((a, b) => a.ay - b.ay)
    for (let i = 1; i < col.length; i++) col[i].ly = Math.max(col[i].ly, col[i - 1].ly + gap)
  }
  const hasLeft = anchors.some((a) => a.side === "left")
  const hasRight = anchors.some((a) => a.side === "right")
  const colGap = 28
  const leftCol = minX - colGap
  const rightCol = maxX + colGap
  const vx = minX - (hasLeft ? labelWidth + colGap : 8)
  const vw = maxX - minX + (hasLeft ? labelWidth + colGap : 8) + (hasRight ? labelWidth + colGap : 8)
  const labelMaxY = Math.max(maxY, ...anchors.map((a) => a.ly + 28))
  const vy = minY - 12
  const vh = labelMaxY - minY + 40

  return (
    <svg
      viewBox={`${vx.toFixed(0)} ${vy.toFixed(0)} ${vw.toFixed(0)} ${vh.toFixed(0)}`}
      className={cn("h-auto w-full overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <filter id={`grain${uid}`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 1.25" result="a" />
          <feComposite in="a" in2="SourceGraphic" operator="in" />
        </filter>
        <filter id={`soft${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={unit * 0.6} />
        </filter>
      </defs>

      {/* Floor shadow under everything resting on z=0 */}
      {blocks
        .filter((b) => (b.z ?? 0) === 0 && b.h > 0 && b.tone !== "ghost" && b.tone !== "outline")
        .map((b, i) => (
          <polygon
            key={`s${i}`}
            points={pts([p(b.x + 0.6, b.y + 0.6, -0.1), p(b.x + b.w + 1.4, b.y + 0.6, -0.1), p(b.x + b.w + 1.4, b.y + b.d + 1.4, -0.1), p(b.x + 0.6, b.y + b.d + 1.4, -0.1)])}
            style={{ fill: "var(--foreground)", opacity: 0.07 }}
            filter={`url(#soft${uid})`}
          />
        ))}

      {ordered.map((b, i) => {
        const z = b.z ?? 0
        const t = z + b.h
        const top = [p(b.x, b.y, t), p(b.x + b.w, b.y, t), p(b.x + b.w, b.y + b.d, t), p(b.x, b.y + b.d, t)]
        const left = [p(b.x, b.y + b.d, t), p(b.x + b.w, b.y + b.d, t), p(b.x + b.w, b.y + b.d, z), p(b.x, b.y + b.d, z)]
        const right = [p(b.x + b.w, b.y, t), p(b.x + b.w, b.y + b.d, t), p(b.x + b.w, b.y + b.d, z), p(b.x + b.w, b.y, z)]
        const tone = b.tone ?? "paper"

        if (tone === "outline") {
          return (
            <polygon key={i} points={pts(top)} style={{ fill: "none", stroke: "var(--foreground)", strokeOpacity: 0.55 }} strokeWidth={1} strokeDasharray="4 4" />
          )
        }
        if (tone === "ghost") {
          const back = [p(b.x, b.y, z), p(b.x + b.w, b.y, z), p(b.x, b.y + b.d, z), p(b.x, b.y, t)]
          return (
            <g key={i} style={{ stroke: "var(--foreground)", strokeOpacity: 0.45 }} strokeWidth={1} strokeLinejoin="round">
              {/* hidden edges, so the cube reads as "your own environment" */}
              <polyline points={pts([back[1], back[0], back[2]])} fill="none" strokeDasharray="3 3" />
              <line x1={back[0][0]} y1={back[0][1]} x2={back[3][0]} y2={back[3][1]} strokeDasharray="3 3" />
              <polygon points={pts(top)} style={{ fill: "var(--foreground)", fillOpacity: 0.04 }} />
              <polygon points={pts(left)} style={{ fill: "var(--foreground)", fillOpacity: 0.07 }} />
              <polygon points={pts(right)} style={{ fill: "var(--foreground)", fillOpacity: 0.1 }} />
            </g>
          )
        }
        const c = tones[tone]
        const face = (poly: (readonly [number, number])[], f: Face, k: string) => (
          <React.Fragment key={k}>
            <polygon points={pts(poly)} style={{ fill: f.fill }} />
            {f.texture && <polygon points={pts(poly)} style={{ fill: "black", opacity: 0.32 }} filter={`url(#grain${uid})`} />}
          </React.Fragment>
        )
        return (
          <g key={i} strokeLinejoin="round">
            {b.h > 0 && face(left, c.left, "l")}
            {b.h > 0 && face(right, c.right, "r")}
            {face(top, c.top, "t")}
            <polygon points={pts(top)} style={{ fill: "none", stroke: "var(--foreground)", strokeOpacity: 0.12 }} strokeWidth={0.75} />
          </g>
        )
      })}

      {anchors.map(({ b, side, ax, ay, ly }, i) => {
        const cx = side === "right" ? rightCol : leftCol
        const anchor = side === "right" ? "start" : "end"
        const tx = side === "right" ? cx + 8 : cx - 8
        return (
          <g key={`l${i}`}>
            <polyline
              points={pts([[ax, ay], [ax + (side === "right" ? 10 : -10), ly], [cx, ly]])}
              fill="none"
              style={{ stroke: "var(--foreground)", strokeOpacity: 0.55 }}
              strokeWidth={0.9}
            />
            <circle cx={ax} cy={ay} r={2} style={{ fill: "var(--foreground)" }} />
            <text x={tx} y={ly + 4} textAnchor={anchor} style={{ fill: "var(--foreground)", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, letterSpacing: "0.04em" }}>
              {b.label?.toUpperCase()}
            </text>
            {b.sublabel && (
              <text x={tx} y={ly + 21} textAnchor={anchor} style={{ fill: "var(--muted-foreground)", fontFamily: "var(--font-sans)", fontSize: 12 }}>
                {b.sublabel}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
