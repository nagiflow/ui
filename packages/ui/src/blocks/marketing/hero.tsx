import * as React from "react"
import { DefaultLink } from "../../lib/link.tsx"
import { ArrowRight } from "lucide-react"
import { cn } from "../../lib/utils.ts"
import { DotField } from "../../illustrations/dot-field.tsx"
import { ActionButtons, Container, Eyebrow, typography, type Action, type LinkComponent } from "./section.tsx"

export function Hero({
  eyebrow,
  announcement,
  title,
  description,
  primaryAction,
  secondaryAction,
  note,
  visual,
  variant = "split",
  tone = "muted",
  linkAs: Link = DefaultLink,
  className,
  children,
}: {
  eyebrow?: React.ReactNode
  /** Small pill link above the title (launch, report, event). */
  announcement?: Action & { tag?: React.ReactNode }
  title: React.ReactNode
  description?: React.ReactNode
  primaryAction?: Action
  secondaryAction?: Action
  /** Reassurance under the CTAs, e.g. "No credit card required". */
  note?: React.ReactNode
  visual?: React.ReactNode
  variant?: "split" | "centered"
  tone?: "default" | "muted"
  linkAs?: LinkComponent
  className?: string
  /** Rendered under the hero inside the same band (e.g. a LogoCloud). */
  children?: React.ReactNode
}) {
  const centered = variant === "centered"
  return (
    <section className={cn("relative overflow-hidden [&:lang(ja)]:[word-break:auto-phrase]", tone === "muted" && "bg-muted/60", className)}>
      <Container className={cn("relative grid gap-12 pt-16 pb-16 lg:pt-24 lg:pb-24", centered ? "text-center" : "items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8")}>
        <div className={cn(centered && "mx-auto max-w-4xl")}>
          {announcement && (
            <Link href={announcement.href} className="mb-8 inline-flex max-w-full items-center gap-2 rounded-full border bg-background py-1 pr-3 pl-1 text-xs hover:border-foreground/30">
              {announcement.tag && <span className="rounded-full bg-accent px-2 py-0.5 font-semibold text-accent-foreground">{announcement.tag}</span>}
              <span className="truncate">{announcement.label}</span>
              <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
            </Link>
          )}
          {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
          <h1 className={typography.display}>{title}</h1>
          {description && <p className={cn(typography.lead, "mt-6", centered ? "mx-auto max-w-2xl" : "max-w-xl")}>{description}</p>}
          <ActionButtons primary={primaryAction} secondary={secondaryAction} linkAs={Link} className={cn("mt-10", centered && "justify-center")} />
          {note && <p className="mt-4 text-xs text-muted-foreground">{note}</p>}
        </div>
        {visual && (
          <div className={cn("relative", centered ? "mx-auto mt-4 w-full max-w-5xl" : "lg:-mr-8 xl:-mr-16")}>
            <DotField className="-inset-x-10 -inset-y-12" />
            <div className="relative">{visual}</div>
          </div>
        )}
      </Container>
      {children && <div className="relative border-t bg-background/60">{children}</div>}
    </section>
  )
}
