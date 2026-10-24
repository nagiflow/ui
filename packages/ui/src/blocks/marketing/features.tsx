import * as React from "react"
import { Check, type LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils.ts"
import { IconTile } from "../../illustrations/marks.tsx"
import { ArrowLink, Container, Eyebrow, Section, SectionHeading, typography, type Action, type LinkComponent } from "./section.tsx"

export type Feature = { icon?: LucideIcon; title: React.ReactNode; description: React.ReactNode; action?: Action }

/** Grid of capabilities. Top rules instead of boxed cards keep it calm and scannable. */
export function FeatureGrid({
  eyebrow, title, description, features, columns = 3, tone = "default", variant = "rule", linkAs, className,
}: {
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  features: Feature[]
  columns?: 2 | 3 | 4
  tone?: "default" | "muted" | "brand"
  /** rule: hairline above each item. card: bordered tiles, first one highlighted. */
  variant?: "rule" | "card"
  linkAs?: LinkComponent
  className?: string
}) {
  return (
    <Section tone={tone} className={className}>
      <Container>
        {title && <SectionHeading eyebrow={eyebrow} title={title} description={description} className="mb-14 lg:mb-16" />}
        <ul className={cn("grid gap-x-8 gap-y-12 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3", columns === 4 && "lg:grid-cols-4", variant === "card" && "gap-y-6 gap-x-6")}>
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <li
                key={i}
                className={cn(
                  "flex flex-col",
                  variant === "rule" && "border-t pt-6",
                  variant === "card" && "rounded-lg border border-t-4 border-t-foreground/80 bg-card p-6",
                )}
              >
                {Icon && <IconTile className="mb-5"><Icon strokeWidth={1.75} /></IconTile>}
                <h3 className={typography.h3}>{f.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground [&:lang(ja)]:leading-[1.85]">{f.description}</p>
                {f.action && <ArrowLink action={f.action} linkAs={linkAs} className="mt-5" />}
              </li>
            )
          })}
        </ul>
      </Container>
    </Section>
  )
}

export type SplitItem = {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  bullets?: React.ReactNode[]
  action?: Action
  visual: React.ReactNode
}

/** Alternating text / visual rows. One idea per row; the visual proves the claim. */
export function FeatureSplit({ eyebrow, title, description, items, tone = "default", linkAs, className }: {
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  items: SplitItem[]
  tone?: "default" | "muted" | "brand"
  linkAs?: LinkComponent
  className?: string
}) {
  return (
    <Section tone={tone} className={className}>
      <Container>
        {title && <SectionHeading eyebrow={eyebrow} title={title} description={description} className="mb-16 lg:mb-24" />}
        <div className="grid gap-20 lg:gap-28">
          {items.map((it, i) => (
            <div key={i} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={cn("max-w-xl", i % 2 === 1 && "lg:order-2")}>
                {it.eyebrow && <Eyebrow className="mb-4">{it.eyebrow}</Eyebrow>}
                <h3 className="text-2xl leading-snug font-semibold tracking-[-0.015em] lg:text-[32px] [&:lang(ja)]:leading-[1.45] [&:lang(ja)]:tracking-normal">{it.title}</h3>
                <p className={cn(typography.body, "mt-5")}>{it.description}</p>
                {it.bullets && (
                  <ul className="mt-6 grid gap-3">
                    {it.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-[15px] leading-relaxed">
                        <Check className="mt-1 size-4 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {it.action && <ArrowLink action={it.action} linkAs={linkAs} className="mt-8" />}
              </div>
              <div className={cn("min-w-0", i % 2 === 1 && "lg:order-1")}>{it.visual}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
