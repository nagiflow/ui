"use client"
import * as React from "react"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import { LinkProvider } from "./lib/link.tsx"
import { LocaleProvider, type Locale } from "./lib/locale.tsx"

/**
 * Next.js App Router integration. Put it in app/layout.tsx:
 *   <NagiflowProvider locale="ja">{children}</NagiflowProvider>
 * Blocks then use next/link and highlight the current route without any props.
 */
export function NagiflowProvider({ locale = "ja", children }: { locale?: Locale; children: React.ReactNode }) {
  return (
    <LocaleProvider locale={locale}>
      <LinkProvider Link={NextLink} pathname={usePathname()}>{children}</LinkProvider>
    </LocaleProvider>
  )
}
