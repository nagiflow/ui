"use client"
import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "../lib/utils.ts"
import { fieldControl } from "./input.tsx"

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value
export const SelectGroup = SelectPrimitive.Group

export function SelectTrigger({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger className={cn(fieldControl, "flex h-10 items-center justify-between gap-2 text-left data-placeholder:text-muted-foreground [&>span]:truncate", className)} {...props}>
      {children}
      <SelectPrimitive.Icon asChild><ChevronDown className="size-4 opacity-60" /></SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export function SelectContent({ className, children, position = "popper", ...props }: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position={position}
        className={cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg", position === "popper" && "translate-y-1", className)}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item className={cn("relative flex cursor-pointer items-center rounded-sm py-2 pr-8 pl-2.5 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-muted", className)} {...props}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-2.5"><Check className="size-4 text-primary" /></SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

export type SelectOption = { value: string; label: React.ReactNode }

/** Select for use inside <Field>: receives id / aria-* from Field and submits via `name`. */
export function SelectField({ name, defaultValue, value, onValueChange, options, placeholder, required, disabled, ...rest }: {
  name?: string; defaultValue?: string; value?: string; onValueChange?: (v: string) => void; options: SelectOption[]; placeholder?: string; required?: boolean; disabled?: boolean
  id?: string; "aria-invalid"?: boolean; "aria-describedby"?: string; className?: string
}) {
  return (
    <Select name={name} defaultValue={defaultValue} value={value} onValueChange={onValueChange} required={required} disabled={disabled}>
      <SelectTrigger {...rest}><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>{options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
    </Select>
  )
}
