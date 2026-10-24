import * as React from "react"
import { cn } from "../../lib/utils.ts"
import { PlaceholderLogo } from "../../illustrations/marks.tsx"
import { Container } from "./section.tsx"

export type Logo = { name: string; variant?: number } | React.ReactElement

/** Customer logo wall. Logos render monochrome so no single brand dominates. */
export function LogoCloud({ title, logos, className }: { title?: React.ReactNode; logos: Logo[]; className?: string }) {
  return (
    <Container className={cn("py-10", className)}>
      {title && <p className="mb-8 text-center text-sm text-muted-foreground">{title}</p>}
      <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
        {logos.map((l, i) => (
          <li key={i} className="flex justify-center text-foreground/65">
            {React.isValidElement(l) ? l : <PlaceholderLogo name={(l as { name: string }).name} variant={(l as { variant?: number }).variant ?? i} />}
          </li>
        ))}
      </ul>
    </Container>
  )
}
