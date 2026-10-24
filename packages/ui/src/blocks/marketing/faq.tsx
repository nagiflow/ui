"use client"
import * as React from "react"
import { cn } from "../../lib/utils.ts"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../components/menu.tsx"
import { ArrowLink, Container, Eyebrow, Section, typography, type Action, type LinkComponent } from "./section.tsx"

export function FAQ({ eyebrow, title, description, items, action, tone = "default", linkAs, className }: {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  items: { question: React.ReactNode; answer: React.ReactNode }[]
  action?: Action
  tone?: "default" | "muted" | "brand"
  linkAs?: LinkComponent
  className?: string
}) {
  return (
    <Section tone={tone} className={className}>
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
          <h2 className={typography.h2}>{title}</h2>
          {description && <p className={cn(typography.body, "mt-5")}>{description}</p>}
          {action && <ArrowLink action={action} linkAs={linkAs} className="mt-6" />}
        </div>
        <Accordion type="multiple" className="border-t">
          {items.map((it, i) => (
            <AccordionItem key={i} value={String(i)}>
              <AccordionTrigger className="justify-start">
                <span className="w-9 shrink-0 font-mono text-sm text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">{it.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pl-9 text-[15px] [&:lang(ja)]:leading-[1.85]">{it.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  )
}
