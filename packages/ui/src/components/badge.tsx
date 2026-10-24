import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils.ts"

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-xs font-medium leading-tight whitespace-nowrap [&_svg]:size-3",
  {
    variants: {
      variant: {
        neutral: "border-border bg-muted text-foreground",
        brand: "border-transparent bg-accent text-accent-foreground",
        success: "border-success/30 bg-success/10 text-success",
        warning: "border-warning/50 bg-warning/15 text-warning-foreground dark:text-warning",
        destructive: "border-destructive/30 bg-destructive/10 text-destructive",
        outline: "border-input text-muted-foreground",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
)

export function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}
