"use client"
import * as React from "react"
import { Search, X } from "lucide-react"
import { cn } from "../../lib/utils.ts"
import { Button } from "../../components/button.tsx"
import { Input } from "../../components/input.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/select.tsx"
import { useDashboardStrings } from "./strings.ts"

export type Filter = {
  key: string
  label: string
  options: { value: string; label: string }[]
  /** Empty string = no filter ("all"). */
  value: string
  onChange: (value: string) => void
  allLabel?: string
}

export interface FilterBarProps {
  search?: string
  onSearchChange?: (q: string) => void
  searchPlaceholder?: string
  filters?: Filter[]
  onClear?: () => void
  /** Right-aligned secondary actions (export, column settings). */
  actions?: React.ReactNode
  className?: string
}

const ALL = "__all__"

export function FilterBar({ search, onSearchChange, searchPlaceholder, filters = [], onClear, actions, className }: FilterBarProps) {
  const t = useDashboardStrings()
  const active = !!search || filters.some((f) => f.value)
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {onSearchChange && (
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input type="search" value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder={searchPlaceholder} aria-label={searchPlaceholder} className="h-9 pl-9" />
        </div>
      )}
      {filters.map((f) => (
        <Select key={f.key} value={f.value || ALL} onValueChange={(v) => f.onChange(v === ALL ? "" : v)}>
          <SelectTrigger aria-label={f.label} className={cn("h-9 w-auto min-w-36 justify-start gap-1.5", f.value && "border-primary/60 bg-accent/50")}>
            <span className="text-muted-foreground">{f.label}:</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>{f.allLabel ?? "—"}</SelectItem>
            {f.options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
      ))}
      {active && onClear && (
        <Button variant="ghost" size="sm" onClick={onClear}><X />{t.clearFilters}</Button>
      )}
      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </div>
  )
}
