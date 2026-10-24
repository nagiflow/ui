"use client"
import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"
import { cn } from "../lib/utils.ts"
import { useStrings } from "../lib/locale.tsx"

export function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return <LabelPrimitive.Root data-slot="label" className={cn("text-sm font-semibold leading-snug select-none", className)} {...props} />
}

type FieldCtx = { id: string; descId: string; errorId: string; invalid: boolean }
const FieldContext = React.createContext<FieldCtx | null>(null)

/**
 * Label + control + help + error, wired for a11y. The control is the single child element
 * that receives id / aria-describedby / aria-invalid automatically.
 */
export function Field({
  label,
  description,
  error,
  required,
  optional,
  className,
  children,
}: {
  label: React.ReactNode
  description?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  optional?: boolean
  className?: string
  children: React.ReactElement<Record<string, unknown>>
}) {
  const t = useStrings()
  const id = React.useId()
  const ctx = { id, descId: `${id}-d`, errorId: `${id}-e`, invalid: !!error }
  const describedBy = [description && ctx.descId, error && ctx.errorId].filter(Boolean).join(" ") || undefined
  return (
    <FieldContext.Provider value={ctx}>
      <div data-slot="field" className={cn("grid content-start gap-1.5", className)}>
        <Label htmlFor={id} className="flex items-center gap-2">
          {label}
          {required && <span className="rounded-sm bg-destructive/10 px-1 text-[11px] font-semibold text-destructive">{t.required}</span>}
          {optional && <span className="text-xs font-normal text-muted-foreground">{t.optional}</span>}
        </Label>
        {description && <p id={ctx.descId} className="-mt-0.5 text-xs leading-relaxed text-muted-foreground">{description}</p>}
        {React.cloneElement(children, { id, "aria-describedby": describedBy, "aria-invalid": ctx.invalid || undefined, required })}
        {error && <p id={ctx.errorId} role="alert" className="text-xs font-medium text-destructive">{error}</p>}
      </div>
    </FieldContext.Provider>
  )
}
