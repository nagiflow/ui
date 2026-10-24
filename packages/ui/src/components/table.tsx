import * as React from "react"
import { cn } from "../lib/utils.ts"

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table" className="relative w-full overflow-x-auto">
      <table className={cn("w-full caption-bottom border-collapse text-sm", className)} {...props} />
    </div>
  )
}
export function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead className={cn("bg-muted/70 [&_tr]:border-b", className)} {...props} />
}
export function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
}
export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-accent/60", className)} {...props} />
}
/** Numeric columns: pass `numeric` so digits right-align and use tabular figures. */
export function TableHead({ className, numeric, ...props }: React.ComponentProps<"th"> & { numeric?: boolean }) {
  return <th className={cn("h-10 px-4 text-left align-middle text-xs font-semibold whitespace-nowrap text-muted-foreground", numeric && "text-right", className)} {...props} />
}
export function TableCell({ className, numeric, ...props }: React.ComponentProps<"td"> & { numeric?: boolean }) {
  return <td className={cn("px-4 py-3 align-middle leading-normal", numeric && "text-right tabular-nums", className)} {...props} />
}
