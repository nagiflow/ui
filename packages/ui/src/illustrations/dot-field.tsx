import * as React from "react"
import { cn } from "../lib/utils.ts"

/** Halftone dot texture that fades out at the edges. Decorative backdrop for diagrams and screenshots. */
export function DotField({ className, size = 10, fade = "radial" }: { className?: string; size?: number; fade?: "radial" | "left" | "right" | "none" }) {
  const masks = {
    radial: "radial-gradient(closest-side, black 30%, transparent)",
    left: "linear-gradient(to right, black, transparent 70%)",
    right: "linear-gradient(to left, black, transparent 70%)",
    none: "none",
  }
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute text-foreground/20", className)}
      style={{
        backgroundImage: "radial-gradient(currentColor 1px, transparent 1.2px)",
        backgroundSize: `${size}px ${size}px`,
        maskImage: masks[fade],
        WebkitMaskImage: masks[fade],
      }}
    />
  )
}
