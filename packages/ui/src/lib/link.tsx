"use client"
import * as React from "react"

type LinkCtx = { Link: React.ElementType; pathname?: string }
const LinkContext = React.createContext<LinkCtx>({ Link: "a" })

/** Provide the app's router Link and current path once; every block picks them up. */
export function LinkProvider({ Link, pathname, children }: LinkCtx & { children: React.ReactNode }) {
  return <LinkContext.Provider value={{ Link, pathname }}>{children}</LinkContext.Provider>
}

/** Default for every `linkAs` prop: the provided router Link, else a plain <a>. */
export function DefaultLink(props: React.ComponentProps<"a">) {
  const { Link } = React.useContext(LinkContext)
  return <Link {...props} />
}

export function useCurrentPath(explicit?: string) {
  const { pathname } = React.useContext(LinkContext)
  return explicit ?? pathname
}
