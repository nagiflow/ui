import * as React from "react"
import { cn } from "../lib/utils.ts"

export const fieldControl =
  "w-full rounded-md border border-input bg-background px-3 text-base text-foreground transition-colors placeholder:text-muted-foreground/80 hover:border-foreground/40 focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ring/30 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 aria-invalid:border-destructive aria-invalid:outline-destructive/20 sm:text-sm"

export function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(fieldControl, "h-10 file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium", className)} {...props} />
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(fieldControl, "min-h-24 py-2 leading-relaxed", className)} {...props} />
}
