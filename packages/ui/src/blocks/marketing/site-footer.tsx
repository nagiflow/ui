"use client"
import * as React from "react"
import { useStrings } from "../../lib/locale.tsx"
import { DefaultLink } from "../../lib/link.tsx"
import { Globe } from "lucide-react"
import { cn } from "../../lib/utils.ts"
import { Container, type Action, type LinkComponent } from "./section.tsx"

export function SiteFooter({ logo, tagline, columns, legal, copyright, locales, locale, onLocaleChange, localeLabel, linkAs: Link = DefaultLink, className }: {
  logo: React.ReactNode
  tagline?: React.ReactNode
  columns: { title: React.ReactNode; links: Action[] }[]
  legal?: Action[]
  copyright: React.ReactNode
  locales?: { value: string; label: string }[]
  locale?: string
  onLocaleChange?: (value: string) => void
  localeLabel?: string
  linkAs?: LinkComponent
  className?: string
}) {
  const t = useStrings()
  return (
    <footer className={cn("dark border-t bg-brand-surface text-foreground", className)}>
      <Container className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:py-20">
        <div className="max-w-xs">
          {logo}
          {tagline && <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{tagline}</p>}
        </div>
        <nav className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {columns.map((col, i) => (
            <div key={i}>
              <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">{col.title}</p>
              <ul className="mt-4 grid gap-2.5">
                {col.links.map((l, j) => (
                  <li key={j}><Link href={l.href} className="text-sm text-foreground/85 hover:text-foreground hover:underline underline-offset-4">{l.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>
      <div className="border-t">
        <Container className="flex flex-col gap-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <p>{copyright}</p>
            {legal && (
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {legal.map((l, i) => <li key={i}><Link href={l.href} className="hover:text-foreground hover:underline">{l.label}</Link></li>)}
              </ul>
            )}
          </div>
          {locales && (
            <label className="relative inline-flex items-center gap-2 self-start">
              <Globe className="size-4" aria-hidden />
              <span className="sr-only">{localeLabel ?? t.language}</span>
              <select
                value={locale}
                onChange={(e) => onLocaleChange?.(e.target.value)}
                className="cursor-pointer appearance-none rounded-md border border-input bg-transparent py-1.5 pr-3 pl-2 text-xs text-foreground"
              >
                {locales.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </label>
          )}
        </Container>
      </div>
    </footer>
  )
}
