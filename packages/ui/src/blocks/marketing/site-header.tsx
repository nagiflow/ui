"use client"
import * as React from "react"
import { DefaultLink } from "../../lib/link.tsx"
import { NavigationMenu as NM } from "radix-ui"
import { ChevronDown, Menu, X, type LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils.ts"
import { useStrings } from "../../lib/locale.tsx"
import { Button } from "../../components/button.tsx"
import { Dialog, DialogTrigger, DialogClose, SheetContent, DialogTitle } from "../../components/overlay.tsx"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../../components/menu.tsx"
import { Container, type Action, type LinkComponent } from "./section.tsx"

export type SiteNavLink = { title: React.ReactNode; description?: React.ReactNode; href: string; icon?: LucideIcon }
export type SiteNavGroup = { title?: React.ReactNode; items: SiteNavLink[] }
export type SiteNavItem =
  | { label: React.ReactNode; href: string }
  | { label: React.ReactNode; groups: SiteNavGroup[]; featured?: { eyebrow?: React.ReactNode; title: React.ReactNode; description?: React.ReactNode; action: Action } }

export function SiteHeader({
  logo,
  nav,
  login,
  cta,
  secondaryCta,
  announcement,
  utilityLinks,
  linkAs: Link = DefaultLink,
  sticky = true,
  className,
}: {
  logo: React.ReactNode
  nav: SiteNavItem[]
  login?: Action
  cta?: Action
  secondaryCta?: Action
  /** Thin bar above the header: one news item + a link. */
  announcement?: { text: React.ReactNode; action?: Action }
  /** Small links in the announcement bar (company, support, …). */
  utilityLinks?: Action[]
  linkAs?: LinkComponent
  sticky?: boolean
  className?: string
}) {
  const t = useStrings()
  return (
    <header className={cn("z-40 bg-background", sticky && "sticky top-0", className)}>
      {(announcement || utilityLinks) && (
        <div className="hidden border-b text-xs md:block">
          <Container className="flex h-9 items-center justify-between gap-6">
            <p className="truncate text-muted-foreground">
              {announcement?.text}
              {announcement?.action && (
                <Link href={announcement.action.href} className="ml-2 font-medium text-primary hover:underline">{announcement.action.label}</Link>
              )}
            </p>
            <ul className="flex shrink-0 items-center gap-5">
              {utilityLinks?.map((l, i) => (
                <li key={i}><Link href={l.href} className="text-muted-foreground hover:text-foreground">{l.label}</Link></li>
              ))}
            </ul>
          </Container>
        </div>
      )}
      <div className="border-b">
        <Container className="flex h-16 items-center gap-8">
          <Link href="/" className="shrink-0">{logo}</Link>

          <NM.Root className="relative hidden flex-1 lg:block" delayDuration={80}>
            <NM.List className="flex items-center gap-1">
              {nav.map((item, i) => (
                <NM.Item key={i}>
                  {"groups" in item ? (
                    <>
                      <NM.Trigger className="group flex h-9 cursor-pointer items-center gap-1 rounded-md px-3 text-sm font-medium hover:bg-muted data-[state=open]:bg-muted">
                        {item.label}
                        <ChevronDown className="size-3.5 opacity-60 transition-transform group-data-[state=open]:rotate-180" aria-hidden />
                      </NM.Trigger>
                      <NM.Content className="w-[min(860px,calc(100vw-4rem))]">
                        <MegaMenu item={item} linkAs={Link} />
                      </NM.Content>
                    </>
                  ) : (
                    <NM.Link asChild>
                      <Link href={item.href} className="flex h-9 items-center rounded-md px-3 text-sm font-medium hover:bg-muted">{item.label}</Link>
                    </NM.Link>
                  )}
                </NM.Item>
              ))}
            </NM.List>
            <div className="absolute top-full left-0 flex justify-start pt-2">
              <NM.Viewport className="relative h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width) overflow-hidden rounded-lg border bg-popover text-popover-foreground shadow-xl transition-[width,height] duration-200" />
            </div>
          </NM.Root>

          <div className="ml-auto flex items-center gap-2">
            {login && <Link href={login.href} className="hidden px-3 text-sm font-medium hover:text-primary sm:block">{login.label}</Link>}
            {secondaryCta && (
              <Button asChild variant="secondary" className="hidden border-primary/50 text-primary hover:bg-accent xl:inline-flex"><Link href={secondaryCta.href}>{secondaryCta.label}</Link></Button>
            )}
            {cta && <Button asChild className="hidden sm:inline-flex"><Link href={cta.href}>{cta.label}</Link></Button>}

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label={t.menu}><Menu /></Button>
              </DialogTrigger>
              <SheetContent side="right" className="w-full max-w-sm">
                <div className="flex h-16 shrink-0 items-center justify-between border-b px-5">
                  <DialogTitle className="sr-only">{t.menu}</DialogTitle>
                  {logo}
                  <DialogClose asChild><Button variant="ghost" size="icon" aria-label={t.close}><X /></Button></DialogClose>
                </div>
                <nav className="flex-1 overflow-y-auto px-5">
                  <Accordion type="single" collapsible>
                    {nav.map((item, i) =>
                      "groups" in item ? (
                        <AccordionItem key={i} value={String(i)}>
                          <AccordionTrigger className="py-4 text-base">{item.label}</AccordionTrigger>
                          <AccordionContent>
                            <ul className="grid gap-1">
                              {item.groups.flatMap((g) => g.items).map((l, j) => (
                                <li key={j}><Link href={l.href} className="block rounded-md py-2 text-[15px] text-foreground hover:text-primary">{l.title}</Link></li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <Link key={i} href={item.href} className="block border-b py-4 text-base font-semibold">{item.label}</Link>
                      ),
                    )}
                  </Accordion>
                </nav>
                <div className="grid gap-2 border-t p-5">
                  {cta && <Button asChild size="lg"><Link href={cta.href}>{cta.label}</Link></Button>}
                  {secondaryCta && <Button asChild size="lg" variant="secondary"><Link href={secondaryCta.href}>{secondaryCta.label}</Link></Button>}
                  {login && <Button asChild size="lg" variant="ghost"><Link href={login.href}>{login.label}</Link></Button>}
                </div>
              </SheetContent>
            </Dialog>
          </div>
        </Container>
      </div>
    </header>
  )
}

function MegaMenu({ item, linkAs: Link }: { item: Extract<SiteNavItem, { groups: SiteNavGroup[] }>; linkAs: LinkComponent }) {
  return (
    <div className={cn("grid", item.featured ? "grid-cols-[1fr_260px]" : "grid-cols-1")}>
      <div className={cn("grid gap-x-6 gap-y-6 p-6", item.groups.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
        {item.groups.map((g, i) => (
          <div key={i}>
            {g.title && <p className="mb-2 px-3 font-mono text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">{g.title}</p>}
            <ul className="grid gap-0.5">
              {g.items.map((l, j) => {
                const Icon = l.icon
                return (
                  <li key={j}>
                    <NM.Link asChild>
                      <Link href={l.href} className="flex gap-3 rounded-md p-3 hover:bg-muted focus-visible:bg-muted">
                        {Icon && <Icon className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.75} aria-hidden />}
                        <span>
                          <span className="block text-sm font-semibold leading-snug">{l.title}</span>
                          {l.description && <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{l.description}</span>}
                        </span>
                      </Link>
                    </NM.Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
      {item.featured && (
        <div className="flex flex-col border-l bg-muted/60 p-6">
          {item.featured.eyebrow && <p className="font-mono text-[11px] font-semibold tracking-[0.12em] text-primary uppercase">{item.featured.eyebrow}</p>}
          <p className="mt-2 text-base font-semibold leading-snug">{item.featured.title}</p>
          {item.featured.description && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.featured.description}</p>}
          <NM.Link asChild>
            <Link href={item.featured.action.href} className="mt-auto pt-6 text-sm font-semibold text-primary hover:underline">{item.featured.action.label} →</Link>
          </NM.Link>
        </div>
      )}
    </div>
  )
}
