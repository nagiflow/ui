"use client"
import * as React from "react"
import { useStrings } from "../../lib/locale.tsx"
import { DefaultLink } from "../../lib/link.tsx"
import { ToggleGroup } from "radix-ui"
import { Check, Minus } from "lucide-react"
import { cn } from "../../lib/utils.ts"
import { Button } from "../../components/button.tsx"
import { Container, Section, SectionHeading, type Action, type LinkComponent } from "./section.tsx"

export type Billing = "monthly" | "yearly"

export type PricingTier = {
  name: React.ReactNode
  description?: React.ReactNode
  /** Per billing period, already formatted (e.g. "¥9,800"). A plain node means "not period-based" (e.g. "要相談"). */
  price: Record<Billing, React.ReactNode> | React.ReactNode
  /** Unit after the price, e.g. "/ユーザー/月". */
  unit?: React.ReactNode
  note?: React.ReactNode
  action: Action
  /** "Includes everything in X, plus:" */
  featuresTitle?: React.ReactNode
  features: React.ReactNode[]
  highlighted?: boolean
  badge?: React.ReactNode
}

export type ComparisonGroup = {
  title: React.ReactNode
  /** One value per tier: true/false render check/dash, anything else renders as text. */
  rows: { label: React.ReactNode; values: (boolean | React.ReactNode)[] }[]
}

const isPeriodic = (p: PricingTier["price"]): p is Record<Billing, React.ReactNode> =>
  typeof p === "object" && p !== null && !React.isValidElement(p) && "monthly" in p

export function PricingTable({
  eyebrow,
  title,
  description,
  tiers,
  billingLabels = { monthly: "月払い", yearly: "年払い" },
  yearlyBadge,
  defaultBilling = "yearly",
  billingAriaLabel,
  footnote,
  tone = "default",
  linkAs: Link = DefaultLink,
  className,
}: {
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  tiers: PricingTier[]
  billingLabels?: Record<Billing, React.ReactNode>
  /** Shown next to the yearly toggle, e.g. "2か月分お得". */
  yearlyBadge?: React.ReactNode
  defaultBilling?: Billing
  billingAriaLabel?: string
  footnote?: React.ReactNode
  tone?: "default" | "muted"
  linkAs?: LinkComponent
  className?: string
}) {
  const t = useStrings()
  const [billing, setBilling] = React.useState<Billing>(defaultBilling)
  const periodic = tiers.some((t) => isPeriodic(t.price))
  return (
    <Section tone={tone} className={className}>
      <Container>
        {title && <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} className="mb-12" />}
        {periodic && (
          <div className="mb-10 flex items-center justify-center gap-3">
            <ToggleGroup.Root
              type="single"
              value={billing}
              onValueChange={(v) => v && setBilling(v as Billing)}
              className="inline-flex rounded-md border bg-muted p-1"
              aria-label={billingAriaLabel ?? t.billingPeriod}
            >
              {(["monthly", "yearly"] as const).map((b) => (
                <ToggleGroup.Item key={b} value={b} className="h-8 cursor-pointer rounded-sm px-4 text-sm font-medium text-muted-foreground data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm">
                  {billingLabels[b]}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup.Root>
            {yearlyBadge && <span className="text-xs font-semibold text-primary">{yearlyBadge}</span>}
          </div>
        )}
        <ul className={cn("grid gap-6 md:grid-cols-2", tiers.length >= 4 ? "xl:grid-cols-4" : "lg:grid-cols-3")}>
          {tiers.map((t, i) => (
            <li
              key={i}
              className={cn(
                "relative flex flex-col rounded-lg border border-t-4 bg-card p-6 lg:p-7",
                t.highlighted ? "border-t-primary shadow-[0_24px_48px_-24px_rgb(0_0_0/0.25)] ring-1 ring-primary/30" : "border-t-foreground/15",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">{t.name}</h3>
                {t.badge && <span className="rounded-sm bg-primary px-2 py-0.5 text-[11px] font-semibold text-primary-foreground">{t.badge}</span>}
              </div>
              {t.description && <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted-foreground">{t.description}</p>}
              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-semibold tracking-tight tabular-nums">{isPeriodic(t.price) ? t.price[billing] : t.price}</span>
                {t.unit && isPeriodic(t.price) && <span className="text-sm text-muted-foreground">{t.unit}</span>}
              </p>
              <p className="mt-1 min-h-5 text-xs text-muted-foreground">{t.note}</p>
              <Button asChild variant={t.highlighted ? "primary" : "secondary"} className="mt-6 w-full">
                <Link href={t.action.href}>{t.action.label}</Link>
              </Button>
              <div className="mt-8 border-t pt-6">
                {t.featuresTitle && <p className="mb-4 text-xs font-semibold text-muted-foreground">{t.featuresTitle}</p>}
                <ul className="grid gap-3">
                  {t.features.map((f, j) => (
                    <li key={j} className="flex gap-2.5 text-sm leading-relaxed">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
        {footnote && <p className="mt-8 text-center text-xs text-muted-foreground">{footnote}</p>}
      </Container>
    </Section>
  )
}

/** Plan-by-plan feature matrix. Scrolls horizontally on small screens. */
export function PricingComparison({ title, tiers, groups, yesLabel, noLabel, tone = "muted", className }: {
  title?: React.ReactNode
  tiers: { name: React.ReactNode; highlighted?: boolean }[]
  groups: ComparisonGroup[]
  /** Screen-reader text for check / dash cells. */
  yesLabel?: string
  noLabel?: string
  tone?: "default" | "muted"
  className?: string
}) {
  const t = useStrings()
  const cell = (v: boolean | React.ReactNode) =>
    v === true ? <><Check className="mx-auto size-4 text-primary" strokeWidth={2.5} aria-hidden /><span className="sr-only">{yesLabel ?? t.included}</span></>
    : v === false ? <><Minus className="mx-auto size-4 text-muted-foreground/60" aria-hidden /><span className="sr-only">{noLabel ?? t.notIncluded}</span></>
    : v
  return (
    <Section tone={tone} className={className}>
      <Container>
        {title && <SectionHeading title={title} className="mb-12" />}
        <div className="overflow-x-auto rounded-lg border bg-card">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="w-[34%] p-4 text-left" />
                {tiers.map((t, i) => (
                  <th key={i} scope="col" className={cn("p-4 text-center text-base font-semibold", t.highlighted && "text-primary")}>{t.name}</th>
                ))}
              </tr>
            </thead>
            {groups.map((g, gi) => (
              <tbody key={gi}>
                <tr className="bg-muted/60">
                  <th colSpan={tiers.length + 1} scope="colgroup" className="px-4 py-2.5 text-left font-mono text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">{g.title}</th>
                </tr>
                {g.rows.map((r, ri) => (
                  <tr key={ri} className="border-t">
                    <th scope="row" className="p-4 text-left font-normal">{r.label}</th>
                    {r.values.map((v, vi) => (
                      <td key={vi} className={cn("p-4 text-center tabular-nums", tiers[vi]?.highlighted && "bg-accent/40")}>{cell(v)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </Container>
    </Section>
  )
}
