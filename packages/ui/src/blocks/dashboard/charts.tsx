"use client"
import * as React from "react"
import { cn } from "../../lib/utils.ts"

/*
 * Minimal SVG charts. Specs: bars <= 24px with 4px rounded data-end, 2px lines,
 * hairline solid grid, area wash ~10%, legend only for >= 2 series, text in text tokens,
 * hover tooltip on every mark, and an sr-only table so values are never chart-only.
 * ponytail: no zoom/brush/stacking; reach for a chart lib when a product needs them.
 */

const SERIES = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"]
const compact = (n: number) => new Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 }).format(n)

function useWidth<T extends HTMLElement>() {
  const ref = React.useRef<T>(null)
  const [w, setW] = React.useState(0)
  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, w] as const
}

/** Clean ticks: 0 .. a round max, 4 steps. */
function ticks(max: number) {
  if (max <= 0) return [0, 1]
  const raw = max / 4
  const mag = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw
  return Array.from({ length: Math.ceil(max / step) + 1 }, (_, i) => i * step)
}

const M = { top: 12, right: 12, bottom: 28, left: 44 }

function Frame({ height, yTicks, y, width, children }: { height: number; yTicks: number[]; y: (v: number) => number; width: number; children: React.ReactNode }) {
  return (
    <svg width={width} height={height} className="block overflow-visible" aria-hidden>
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={M.left} x2={width - M.right} y1={y(v)} y2={y(v)} stroke="var(--border)" strokeWidth={1} shapeRendering="crispEdges" />
          <text x={M.left - 8} y={y(v)} dy="0.32em" textAnchor="end" className="fill-muted-foreground text-[11px] tabular-nums">{compact(v)}</text>
        </g>
      ))}
      {children}
    </svg>
  )
}

function Tip({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border bg-popover px-2.5 py-1.5 text-xs whitespace-nowrap text-popover-foreground shadow-md" style={{ left: x, top: y - 8 }}>
      {children}
    </div>
  )
}

function SrTable({ caption, labels, series }: { caption: string; labels: string[]; series: { name: string; data: number[] }[] }) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <thead><tr><th scope="col" />{series.map((s) => <th key={s.name} scope="col">{s.name}</th>)}</tr></thead>
      <tbody>{labels.map((l, i) => <tr key={l}><th scope="row">{l}</th>{series.map((s) => <td key={s.name}>{s.data[i]}</td>)}</tr>)}</tbody>
    </table>
  )
}

export interface BarChartProps {
  data: { label: string; value: number }[]
  /** Accessible name; usually the card title. */
  label: string
  height?: number
  format?: (v: number) => string
  className?: string
}

export function BarChart({ data, label, height = 220, format = (v) => v.toLocaleString(), className }: BarChartProps) {
  const [ref, width] = useWidth<HTMLDivElement>()
  const [hover, setHover] = React.useState<number | null>(null)
  const yTicks = ticks(Math.max(...data.map((d) => d.value)))
  const max = yTicks[yTicks.length - 1]
  const innerH = height - M.top - M.bottom
  const y = (v: number) => M.top + innerH - (v / max) * innerH
  const band = (width - M.left - M.right) / Math.max(1, data.length)
  const bw = Math.min(24, band * 0.6)
  const r = Math.min(4, bw / 2)

  return (
    <div ref={ref} role="figure" aria-label={label} className={cn("relative w-full", className)} style={{ height }}>
      {width > 0 && (
        <Frame width={width} height={height} yTicks={yTicks} y={y}>
          {data.map((d, i) => {
            const cx = M.left + band * i + band / 2
            const top = y(d.value)
            const h = M.top + innerH - top
            const x0 = cx - bw / 2
            // Rounded data-end, square baseline.
            const path = h <= r ? `M${x0},${top}h${bw}v${h}h${-bw}z` : `M${x0},${top + h}V${top + r}q0,${-r} ${r},${-r}h${bw - 2 * r}q${r},0 ${r},${r}V${top + h}z`
            return (
              <g key={d.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                <rect x={M.left + band * i} y={M.top} width={band} height={innerH} fill="transparent" />
                <path d={path} fill="var(--chart-1)" opacity={hover === null || hover === i ? 1 : 0.45} />
                <text x={cx} y={height - 8} textAnchor="middle" className="fill-muted-foreground text-[11px]">{d.label}</text>
              </g>
            )
          })}
        </Frame>
      )}
      {hover !== null && width > 0 && (
        <Tip x={M.left + band * hover + band / 2} y={y(data[hover].value)}>
          <span className="text-muted-foreground">{data[hover].label}</span> <span className="ml-1 font-semibold tabular-nums">{format(data[hover].value)}</span>
        </Tip>
      )}
      <SrTable caption={label} labels={data.map((d) => d.label)} series={[{ name: label, data: data.map((d) => d.value) }]} />
    </div>
  )
}

export interface LineChartProps {
  labels: string[]
  /** Up to 4 series. Colors follow series order, never rank. */
  series: { name: string; data: number[] }[]
  label: string
  height?: number
  format?: (v: number) => string
  className?: string
}

export function LineChart({ labels, series, label, height = 240, format = (v) => v.toLocaleString(), className }: LineChartProps) {
  const [ref, width] = useWidth<HTMLDivElement>()
  const [hover, setHover] = React.useState<number | null>(null)
  const yTicks = ticks(Math.max(...series.flatMap((s) => s.data)))
  const max = yTicks[yTicks.length - 1]
  const innerH = height - M.top - M.bottom
  const innerW = width - M.left - M.right
  const x = (i: number) => M.left + (labels.length < 2 ? innerW / 2 : (innerW * i) / (labels.length - 1))
  const y = (v: number) => M.top + innerH - (v / max) * innerH
  const every = Math.max(1, Math.ceil(labels.length / Math.max(1, Math.floor(innerW / 64))))
  const single = series.length === 1

  return (
    <div className={cn("w-full", className)}>
      {!single && (
        <ul className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {series.map((s, i) => (
            <li key={s.name} className="flex items-center gap-1.5"><span className="h-0.5 w-3 rounded-full" style={{ background: SERIES[i] }} />{s.name}</li>
          ))}
        </ul>
      )}
      <div ref={ref} role="figure" aria-label={label} className="relative w-full" style={{ height }}
        onMouseMove={(e) => {
          if (!width) return
          const px = e.clientX - e.currentTarget.getBoundingClientRect().left
          const i = Math.round(((px - M.left) / innerW) * (labels.length - 1))
          setHover(Math.min(labels.length - 1, Math.max(0, i)))
        }}
        onMouseLeave={() => setHover(null)}
      >
        {width > 0 && (
          <Frame width={width} height={height} yTicks={yTicks} y={y}>
            {labels.map((l, i) => i % every === 0 && (
              <text key={l} x={x(i)} y={height - 8} textAnchor="middle" className="fill-muted-foreground text-[11px]">{l}</text>
            ))}
            {hover !== null && <line x1={x(hover)} x2={x(hover)} y1={M.top} y2={M.top + innerH} stroke="var(--muted-foreground)" strokeOpacity={0.4} strokeWidth={1} />}
            {series.map((s, si) => {
              const pts = s.data.map((v, i) => `${x(i)},${y(v)}`).join(" L")
              return (
                <g key={s.name}>
                  {single && <path d={`M${x(0)},${y(0)} L${pts} L${x(s.data.length - 1)},${y(0)} Z`} fill={SERIES[si]} opacity={0.1} />}
                  <path d={`M${pts}`} fill="none" stroke={SERIES[si]} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                  {hover !== null && <circle cx={x(hover)} cy={y(s.data[hover])} r={4} fill={SERIES[si]} stroke="var(--card)" strokeWidth={2} />}
                </g>
              )
            })}
          </Frame>
        )}
        {hover !== null && width > 0 && (
          <Tip x={x(hover)} y={y(Math.max(...series.map((s) => s.data[hover])))}>
            <p className="mb-0.5 text-muted-foreground">{labels[hover]}</p>
            {series.map((s, i) => (
              <p key={s.name} className="flex items-center gap-1.5">
                {!single && <span className="h-0.5 w-2.5 rounded-full" style={{ background: SERIES[i] }} />}
                {!single && <span className="text-muted-foreground">{s.name}</span>}
                <span className="ml-auto pl-2 font-semibold tabular-nums">{format(s.data[hover])}</span>
              </p>
            ))}
          </Tip>
        )}
        <SrTable caption={label} labels={labels} series={series} />
      </div>
    </div>
  )
}

/** 12-point trend for stat tiles. Decorative; the tile states the value in text. */
export function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const w = 96, h = 28
  const max = Math.max(...data), min = Math.min(...data)
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - 2 - ((v - min) / (max - min || 1)) * (h - 4)}`).join(" ")
  return (
    <svg width={w} height={h} className={cn("overflow-visible", className)} aria-hidden>
      <polyline points={pts} fill="none" stroke="var(--chart-1)" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}
