"use client"
import * as React from "react"
import { DropdownMenu as M, Tooltip as T, Avatar as A, Separator as S, Tabs as Tb, Accordion as Ac, Progress as P } from "radix-ui"
import { ChevronDown } from "lucide-react"
import { cn } from "../lib/utils.ts"

export const DropdownMenu = M.Root
export const DropdownMenuTrigger = M.Trigger
export const DropdownMenuGroup = M.Group

export function DropdownMenuContent({ className, sideOffset = 6, align = "end", ...props }: React.ComponentProps<typeof M.Content>) {
  return (
    <M.Portal>
      <M.Content sideOffset={sideOffset} align={align} className={cn("z-50 min-w-48 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg", className)} {...props} />
    </M.Portal>
  )
}
export function DropdownMenuItem({ className, destructive, ...props }: React.ComponentProps<typeof M.Item> & { destructive?: boolean }) {
  return <M.Item className={cn("flex cursor-pointer items-center gap-2 rounded-sm px-2.5 py-2 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-muted [&_svg]:size-4 [&_svg]:text-muted-foreground", destructive && "text-destructive [&_svg]:text-destructive data-highlighted:bg-destructive/10", className)} {...props} />
}
export function DropdownMenuLabel({ className, ...props }: React.ComponentProps<typeof M.Label>) {
  return <M.Label className={cn("px-2.5 py-1.5 text-xs text-muted-foreground", className)} {...props} />
}
export function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof M.Separator>) {
  return <M.Separator className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
}

export function Tooltip({ content, children, side = "top" }: { content: React.ReactNode; children: React.ReactNode; side?: "top" | "right" | "bottom" | "left" }) {
  return (
    <T.Provider delayDuration={300}>
      <T.Root>
        <T.Trigger asChild>{children}</T.Trigger>
        <T.Portal>
          <T.Content side={side} sideOffset={6} className="z-50 max-w-xs rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-md">{content}</T.Content>
        </T.Portal>
      </T.Root>
    </T.Provider>
  )
}

/** CJK names: first character (surname). Latin: first letters of the first two words. */
const initials = (name: string) =>
  /[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/.test(name) ? name.trim().charAt(0) : name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("")

export function Avatar({ src, name, className }: { src?: string; name: string; className?: string }) {
  return (
    <A.Root className={cn("relative inline-flex size-8 shrink-0 overflow-hidden rounded-full bg-accent text-accent-foreground", className)}>
      {src && <A.Image src={src} alt={name} className="size-full object-cover" />}
      <A.Fallback className="flex size-full items-center justify-center text-xs font-semibold">{initials(name)}</A.Fallback>
    </A.Root>
  )
}

export function Separator({ className, orientation = "horizontal", ...props }: React.ComponentProps<typeof S.Root>) {
  return <S.Root orientation={orientation} className={cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className)} {...props} />
}

export const Tabs = Tb.Root
export function TabsList({ className, ...props }: React.ComponentProps<typeof Tb.List>) {
  return <Tb.List className={cn("flex gap-6 border-b", className)} {...props} />
}
export function TabsTrigger({ className, ...props }: React.ComponentProps<typeof Tb.Trigger>) {
  return <Tb.Trigger className={cn("-mb-px cursor-pointer border-b-2 border-transparent pt-1 pb-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground", className)} {...props} />
}
export function TabsContent({ className, ...props }: React.ComponentProps<typeof Tb.Content>) {
  return <Tb.Content className={cn("pt-6 outline-none", className)} {...props} />
}

export const Accordion = Ac.Root
export function AccordionItem({ className, ...props }: React.ComponentProps<typeof Ac.Item>) {
  return <Ac.Item className={cn("border-b", className)} {...props} />
}
export function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof Ac.Trigger>) {
  return (
    <Ac.Header className="flex">
      <Ac.Trigger className={cn("group flex flex-1 cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-semibold", className)} {...props}>
        {children}
        <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
      </Ac.Trigger>
    </Ac.Header>
  )
}
export function AccordionContent({ className, ...props }: React.ComponentProps<typeof Ac.Content>) {
  return <Ac.Content className={cn("pb-5 text-sm leading-relaxed text-muted-foreground", className)} {...props} />
}

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <P.Root value={value} className={cn("relative h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}>
      <P.Indicator className="h-full bg-primary transition-transform" style={{ transform: `translateX(-${100 - value}%)` }} />
    </P.Root>
  )
}
