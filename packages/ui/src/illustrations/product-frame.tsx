"use client"
import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "../lib/utils.ts"

/**
 * "Screenshot by code": renders real UI at a fixed design size and scales it to fit.
 *
 * Children render inside a same-origin iframe so responsive breakpoints see the *design*
 * width (1280px) rather than the visitor's viewport — a desktop screenshot stays a desktop
 * screenshot on phones. Page stylesheets, theme class are mirrored in.
 * The picture is inert: not focusable, not clickable, announced only via `label`.
 */
export function ProductFrame({
  children,
  width = 1280,
  height = 800,
  url,
  chrome = "browser",
  label,
  className,
}: {
  children: React.ReactNode
  /** Design width/height the children are laid out at, in px. */
  width?: number
  height?: number
  url?: string
  chrome?: "browser" | "app" | "none"
  /** Accessible description of what the screenshot shows. */
  label?: string
  className?: string
}) {
  const box = React.useRef<HTMLDivElement>(null)
  const [scale, setScale] = React.useState(0)
  const [mount, setMount] = React.useState<HTMLElement | null>(null)
  const frame = React.useRef<HTMLIFrameElement>(null)
  const [loads, setLoads] = React.useState(0)

  React.useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [width])

  // SSR: the srcdoc may finish loading before hydration attaches onLoad.
  React.useEffect(() => {
    if (frame.current?.contentDocument?.readyState === "complete" && frame.current.contentDocument.body) setLoads((n) => n || 1)
  }, [])

  React.useEffect(() => {
    const doc = frame.current?.contentDocument
    if (!loads || !doc) return
    const syncStyles = () => {
      doc.head.replaceChildren(
        ...Array.from(document.querySelectorAll('style, link[rel="stylesheet"]')).map((n) => n.cloneNode(true)),
      )
    }
    const syncRoot = () => {
      const src = document.documentElement
      doc.documentElement.className = src.className
      doc.documentElement.lang = src.lang
      for (const [k, v] of Object.entries(src.dataset)) doc.documentElement.dataset[k] = v
    }
    syncStyles()
    syncRoot()
    doc.body.style.margin = "0"
    const headObs = new MutationObserver(syncStyles)
    headObs.observe(document.head, { childList: true, subtree: true, characterData: true })
    const rootObs = new MutationObserver(syncRoot)
    rootObs.observe(document.documentElement, { attributes: true })
    setMount(doc.body)
    return () => {
      headObs.disconnect()
      rootObs.disconnect()
    }
  }, [loads])

  return (
    <figure
      role={label ? "img" : undefined}
      aria-label={label}
      className={cn("overflow-hidden rounded-xl border bg-card shadow-[0_1px_2px_rgb(0_0_0/0.04),0_24px_48px_-16px_rgb(0_0_0/0.18)]", className)}
    >
      {chrome !== "none" && (
        <div className="flex h-9 items-center gap-3 border-b bg-muted/60 px-3.5" aria-hidden>
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => <span key={i} className="size-2.5 rounded-full bg-foreground/15" />)}
          </div>
          {chrome === "browser" && url && (
            <div className="mx-auto flex h-5 w-full max-w-xs items-center justify-center truncate rounded-sm bg-background px-2 font-mono text-[10px] text-muted-foreground">{url}</div>
          )}
        </div>
      )}
      <div ref={box} className="relative w-full overflow-hidden bg-background" style={{ aspectRatio: `${width} / ${height}` }}>
        <iframe
          ref={frame}
          title={label ?? "product screenshot"}
          aria-hidden
          tabIndex={-1}
          inert
          srcDoc="<!doctype html><html><head></head><body></body></html>"
          onLoad={() => setLoads((n) => n + 1)}
          className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
          style={{ width, height, transform: `scale(${scale})`, visibility: scale && mount ? "visible" : "hidden" }}
        />
        {mount && createPortal(<div className="bg-background text-foreground" style={{ width, height, overflow: "hidden" }}>{children}</div>, mount)}
      </div>
    </figure>
  )
}
