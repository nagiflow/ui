import * as React from "react"
import { cn } from "../../lib/utils.ts"
import { PlaceholderLogo } from "../../illustrations/marks.tsx"
import { Avatar } from "../../components/menu.tsx"
import { ArrowLink, Container, Section, SectionHeading, type Action, type LinkComponent } from "./section.tsx"

export type StatItem = { value: React.ReactNode; label: React.ReactNode; note?: React.ReactNode }

/** Big numbers. Use real, sourced figures only; the `note` is for the footnote/source. */
export function StatsBand({ eyebrow, title, stats, tone = "brand", className }: { eyebrow?: React.ReactNode; title?: React.ReactNode; stats: StatItem[]; tone?: "default" | "muted" | "brand"; className?: string }) {
  return (
    <Section tone={tone} className={cn("py-16 lg:py-20", className)}>
      <Container>
        {title && <SectionHeading eyebrow={eyebrow} title={title} className="mb-12" />}
        <dl className={cn("grid grid-cols-2 gap-y-10 lg:grid-cols-4", "divide-border lg:divide-x")}>
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col lg:px-8 lg:first:pl-0">
              <dt className="order-2 mt-3 text-sm leading-relaxed text-foreground">{s.label}</dt>
              <dd className="order-1 font-mono text-4xl font-semibold tracking-tight text-primary tabular-nums lg:text-5xl">{s.value}</dd>
              {s.note && <dd className="order-3 mt-1 text-xs text-muted-foreground">{s.note}</dd>}
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  )
}

export type CaseStudy = {
  company: string
  logoVariant?: number
  industry?: React.ReactNode
  title: React.ReactNode
  metrics: { value: React.ReactNode; label: React.ReactNode }[]
  action: Action
}

export function CaseStudies({ eyebrow, title, description, items, action, tone = "default", linkAs, className }: {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  items: CaseStudy[]
  action?: Action
  tone?: "default" | "muted" | "brand"
  linkAs?: LinkComponent
  className?: string
}) {
  return (
    <Section tone={tone} className={className}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} className="mb-14" />
        <ul className="grid gap-6 lg:grid-cols-3">
          {items.map((c, i) => (
            <li key={i} className="flex flex-col rounded-lg border border-b-4 border-b-foreground/80 bg-card p-6 lg:p-7">
              <div className="flex items-center justify-between gap-4">
                <PlaceholderLogo name={c.company} variant={c.logoVariant ?? i} className="text-foreground/80" />
                {c.industry && <span className="text-xs text-muted-foreground">{c.industry}</span>}
              </div>
              <p className="mt-6 flex-1 text-lg leading-snug font-semibold [&:lang(ja)]:leading-[1.6]">{c.title}</p>
              <dl className="mt-8 grid grid-cols-2 gap-4 border-t pt-6">
                {c.metrics.map((m, j) => (
                  <div key={j} className="flex flex-col">
                    <dt className="order-2 mt-1 text-xs leading-relaxed text-muted-foreground">{m.label}</dt>
                    <dd className="order-1 font-mono text-3xl font-semibold text-primary tabular-nums">{m.value}</dd>
                  </div>
                ))}
              </dl>
              <ArrowLink action={c.action} linkAs={linkAs} className="mt-6" />
            </li>
          ))}
        </ul>
        {action && <div className="mt-12 text-center"><ArrowLink action={action} linkAs={linkAs} /></div>}
      </Container>
    </Section>
  )
}

export function Testimonial({ quote, name, role, company, logoVariant, avatar, metrics, tone = "default", className }: {
  quote: React.ReactNode
  name: string
  role?: React.ReactNode
  company?: string
  logoVariant?: number
  avatar?: string
  metrics?: { value: React.ReactNode; label: React.ReactNode }[]
  tone?: "default" | "muted" | "brand"
  className?: string
}) {
  return (
    <Section tone={tone} className={className}>
      <Container>
        <figure className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16">
          <div>
            {company && <PlaceholderLogo name={company} variant={logoVariant} className="mb-8 text-foreground/80" />}
            <blockquote className="text-2xl leading-[1.5] font-medium tracking-[-0.01em] lg:text-[30px] [&:lang(ja)]:leading-[1.7] [&:lang(ja)]:tracking-normal">
              <span aria-hidden className="mr-1 text-primary">“</span>{quote}<span aria-hidden className="ml-1 text-primary">”</span>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <Avatar name={name} src={avatar} className="size-11" />
              <div className="text-sm">
                <p className="font-semibold">{name}</p>
                {role && <p className="text-muted-foreground">{role}</p>}
              </div>
            </figcaption>
          </div>
          {metrics && (
            <dl className="grid content-center gap-8 border-t pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              {metrics.map((m, i) => (
                <div key={i} className="flex flex-col">
                  <dt className="order-2 mt-2 text-sm leading-relaxed text-muted-foreground">{m.label}</dt>
                  <dd className="order-1 font-mono text-5xl font-semibold text-primary tabular-nums">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </figure>
      </Container>
    </Section>
  )
}
