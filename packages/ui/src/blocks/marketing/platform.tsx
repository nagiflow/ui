import * as React from "react"
import { cn } from "../../lib/utils.ts"
import { DotField } from "../../illustrations/dot-field.tsx"
import { ArrowLink, Container, Eyebrow, Section, typography, type Action, type LinkComponent } from "./section.tsx"

/** Explains the platform as layers: diagram on one side, numbered layer list on the other. */
export function PlatformSection({ eyebrow, title, description, layers, diagram, action, tone = "default", linkAs, className }: {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  layers?: { name: React.ReactNode; description: React.ReactNode }[]
  /** Usually an <IsoStack />. */
  diagram: React.ReactNode
  action?: Action
  tone?: "default" | "muted" | "brand"
  linkAs?: LinkComponent
  className?: string
}) {
  return (
    <Section tone={tone} className={cn("overflow-hidden", className)}>
      <Container className="grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
          <h2 className={typography.h2}>{title}</h2>
          {description && <p className={cn(typography.body, "mt-6")}>{description}</p>}
          {layers && (
            <ol className="mt-10 grid border-t">
              {layers.map((l, i) => (
                <li key={i} className="grid grid-cols-[2.5rem_1fr] border-b py-4">
                  <span className="pt-0.5 font-mono text-xs font-semibold text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-[15px] font-semibold">{l.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{l.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}
          {action && <ArrowLink action={action} linkAs={linkAs} className="mt-8" />}
        </div>
        <div className="relative">
          <DotField className="-inset-8" />
          <div className="relative">{diagram}</div>
        </div>
      </Container>
    </Section>
  )
}
