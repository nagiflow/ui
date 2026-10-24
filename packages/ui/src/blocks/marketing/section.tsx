import * as React from "react"
import { DefaultLink } from "../../lib/link.tsx"
import { ArrowRight } from "lucide-react"
import { cn } from "../../lib/utils.ts"
import { Button } from "../../components/button.tsx"

/** A link-style action. `href` is passed to `linkAs` (e.g. next/link). */
export type Action = { label: React.ReactNode; href: string }
export type LinkComponent = React.ElementType

/**
 * Marketing typography. Headings read `--nf-font-display` (falls back to sans),
 * so a product can switch display type without touching blocks:
 *   :root { --nf-font-display: var(--font-mono); }
 */
export const typography = {
  display:
    "[font-family:var(--nf-font-display,var(--font-sans))] text-[40px] leading-[1.12] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[64px] [&:lang(ja)]:leading-[1.3] [&:lang(ja)]:tracking-[-0.01em] [&:lang(ja)]:[word-break:auto-phrase]",
  h2: "[font-family:var(--nf-font-display,var(--font-sans))] text-[28px] leading-[1.2] font-semibold tracking-[-0.02em] lg:text-[38px] [&:lang(ja)]:leading-[1.4] [&:lang(ja)]:tracking-normal [&:lang(ja)]:[word-break:auto-phrase]",
  h3: "text-xl leading-snug font-semibold tracking-[-0.01em] [&:lang(ja)]:tracking-normal [&:lang(ja)]:[word-break:auto-phrase]",
  lead: "text-lg leading-relaxed text-muted-foreground lg:text-xl [&:lang(ja)]:leading-[1.85]",
  body: "text-base leading-relaxed text-muted-foreground [&:lang(ja)]:leading-[1.85]",
  eyebrow: "font-mono text-xs font-semibold tracking-[0.14em] text-accent-foreground uppercase",
}

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8", className)} {...props} />
}

/**
 * Full-bleed band. `brand` is a dark band: it re-scopes all tokens to dark mode,
 * so every component inside stays legible without per-component overrides.
 */
export function Section({ tone = "default", className, children, ...props }: React.ComponentProps<"section"> & { tone?: "default" | "muted" | "brand" }) {
  return (
    <section
      className={cn(
        "relative py-16 lg:py-24 [&:lang(ja)]:[word-break:auto-phrase]",
        tone === "muted" && "bg-muted/60",
        tone === "brand" && "dark bg-brand-surface text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn(typography.eyebrow, className)} {...props} />
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  action,
  linkAs,
  className,
  as: H = "h2",
}: {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  align?: "center" | "left"
  action?: Action
  linkAs?: LinkComponent
  className?: string
  as?: "h1" | "h2"
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
      <H className={H === "h1" ? typography.display : typography.h2}>{title}</H>
      {description && <p className={cn(typography.lead, "mt-5")}>{description}</p>}
      {action && <ArrowLink action={action} linkAs={linkAs} className="mt-6" />}
    </div>
  )
}

export function ArrowLink({ action, linkAs: Link = DefaultLink, className }: { action: Action; linkAs?: LinkComponent; className?: string }) {
  return (
    <Link href={action.href} className={cn("group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4", className)}>
      {action.label}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  )
}

export function ActionButtons({ primary, secondary, linkAs: Link = DefaultLink, size = "lg", className }: { primary?: Action; secondary?: Action; linkAs?: LinkComponent; size?: "md" | "lg"; className?: string }) {
  if (!primary && !secondary) return null
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      {primary && <Button asChild size={size}><Link href={primary.href}>{primary.label}</Link></Button>}
      {secondary && <Button asChild size={size} variant="secondary" className="border-primary/50 text-primary hover:bg-accent"><Link href={secondary.href}>{secondary.label}</Link></Button>}
    </div>
  )
}
