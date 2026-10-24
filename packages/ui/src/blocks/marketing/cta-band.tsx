import * as React from "react"
import { cn } from "../../lib/utils.ts"
import { ActionButtons, Container, Section, typography, type Action, type LinkComponent } from "./section.tsx"

/** Closing call to action. `compact` is a single row; `large` is a centered band with an optional visual. */
export function CTABand({ title, description, primaryAction, secondaryAction, variant = "large", tone = "brand", visual, linkAs, className }: {
  title: React.ReactNode
  description?: React.ReactNode
  primaryAction?: Action
  secondaryAction?: Action
  variant?: "large" | "compact"
  tone?: "default" | "muted" | "brand"
  visual?: React.ReactNode
  linkAs?: LinkComponent
  className?: string
}) {
  if (variant === "compact") {
    return (
      <Section tone={tone} className={cn("py-12 lg:py-14", className)}>
        <Container className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-2xl font-semibold tracking-[-0.01em] lg:text-[28px]">{title}</p>
            {description && <p className="mt-2 text-muted-foreground">{description}</p>}
          </div>
          <ActionButtons primary={primaryAction} secondary={secondaryAction} linkAs={linkAs} size="lg" className="shrink-0" />
        </Container>
      </Section>
    )
  }
  return (
    <Section tone={tone} className={cn("overflow-hidden", className)}>
      {/* quiet grid, reads as "infrastructure" rather than decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]" />
      <Container className={cn("relative grid items-center gap-12", visual ? "lg:grid-cols-2" : "text-center")}>
        <div className={cn(!visual && "mx-auto max-w-3xl")}>
          <h2 className={typography.h2}>{title}</h2>
          {description && <p className={cn(typography.lead, "mt-5")}>{description}</p>}
          <ActionButtons primary={primaryAction} secondary={secondaryAction} linkAs={linkAs} className={cn("mt-10", !visual && "justify-center")} />
        </div>
        {visual}
      </Container>
    </Section>
  )
}
