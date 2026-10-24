"use client"
import * as React from "react"
import { ArrowDown, ArrowUp, ArrowUpDown, SearchX } from "lucide-react"
import { cn } from "../../lib/utils.ts"
import { Button } from "../../components/button.tsx"
import { Checkbox } from "../../components/checkbox.tsx"
import { EmptyState, Pagination, Skeleton } from "../../components/feedback.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/table.tsx"
import { useDashboardStrings } from "./strings.ts"

export type Column<T> = {
  key: string
  header: React.ReactNode
  cell: (row: T) => React.ReactNode
  numeric?: boolean
  sortable?: boolean
  className?: string
  /** Hide below this breakpoint to keep mobile tables readable. */
  hideBelow?: "sm" | "md" | "lg"
}
export type SortState = { key: string; dir: "asc" | "desc" }

export interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  getRowId: (row: T) => string
  /** Enables checkboxes; bulk actions appear only when something is selected. */
  selectable?: boolean
  selected?: string[]
  onSelectedChange?: (ids: string[]) => void
  bulkActions?: (ids: string[]) => React.ReactNode
  sort?: SortState
  onSortChange?: (sort: SortState) => void
  loading?: boolean
  /** Shown when rows is empty and not loading. Defaults to a "no results" state. */
  empty?: React.ReactNode
  /** Filters / search, rendered inside the card above the table. */
  toolbar?: React.ReactNode
  pagination?: { page: number; pageSize: number; total: number; onPageChange?: (page: number) => void }
  className?: string
}

const hide = { sm: "hidden sm:table-cell", md: "hidden md:table-cell", lg: "hidden lg:table-cell" }

export function DataTable<T>({ columns, rows, getRowId, selectable, selected: selectedProp, onSelectedChange, bulkActions, sort, onSortChange, loading, empty, toolbar, pagination, className }: DataTableProps<T>) {
  const t = useDashboardStrings()
  const [inner, setInner] = React.useState<string[]>([])
  const selected = selectedProp ?? inner
  const setSelected = (ids: string[]) => (onSelectedChange ? onSelectedChange(ids) : setInner(ids))
  const ids = rows.map(getRowId)
  const allChecked = ids.length > 0 && ids.every((id) => selected.includes(id))
  const someChecked = !allChecked && ids.some((id) => selected.includes(id))
  const colCount = columns.length + (selectable ? 1 : 0)

  return (
    <div className={cn("overflow-hidden rounded-lg border bg-card", className)}>
      {toolbar && <div className="border-b px-4 py-3">{toolbar}</div>}
      {selectable && selected.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 border-b bg-accent/60 px-4 py-2 text-sm" role="region" aria-live="polite">
          <span className="font-semibold text-accent-foreground tabular-nums">{t.selected(selected.length)}</span>
          <div className="flex flex-wrap items-center gap-2">{bulkActions?.(selected)}</div>
          <Button variant="link" size="sm" className="ml-auto" onClick={() => setSelected([])}>{t.clearSelection}</Button>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {selectable && (
              <TableHead className="w-12 pr-0">
                <Checkbox aria-label={t.selectAll} checked={allChecked ? true : someChecked ? "indeterminate" : false}
                  onCheckedChange={() => setSelected(allChecked ? selected.filter((id) => !ids.includes(id)) : [...new Set([...selected, ...ids])])} />
              </TableHead>
            )}
            {columns.map((c) => {
              const active = sort?.key === c.key
              const ariaSort = active ? (sort!.dir === "asc" ? "ascending" : "descending") : undefined
              return (
                <TableHead key={c.key} numeric={c.numeric} aria-sort={ariaSort} className={cn(c.hideBelow && hide[c.hideBelow], c.className)}>
                  {c.sortable && onSortChange ? (
                    <button type="button" onClick={() => onSortChange({ key: c.key, dir: active && sort!.dir === "asc" ? "desc" : "asc" })}
                      className={cn("-mx-1.5 inline-flex cursor-pointer items-center gap-1 rounded px-1.5 py-1 hover:bg-foreground/5 hover:text-foreground", active && "text-foreground", c.numeric && "flex-row-reverse")}>
                      {c.header}
                      {active ? (sort!.dir === "asc" ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />) : <ArrowUpDown className="size-3.5 opacity-40" />}
                      {active && <span className="sr-only">{sort!.dir === "asc" ? t.sortAsc : t.sortDesc}</span>}
                    </button>
                  ) : c.header}
                </TableHead>
              )
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading
            ? Array.from({ length: 5 }, (_, i) => (
                <TableRow key={i} className="hover:bg-transparent">
                  {Array.from({ length: colCount }, (_, j) => (
                    <TableCell key={j}><Skeleton className={cn("h-4", j === 0 && selectable ? "w-4" : "w-full max-w-40")} /></TableCell>
                  ))}
                </TableRow>
              ))
            : rows.map((row) => {
                const id = getRowId(row)
                const isSel = selected.includes(id)
                return (
                  <TableRow key={id} data-state={isSel ? "selected" : undefined}>
                    {selectable && (
                      <TableCell className="w-12 pr-0">
                        <Checkbox aria-label={t.selectRow} checked={isSel} onCheckedChange={() => setSelected(isSel ? selected.filter((s) => s !== id) : [...selected, id])} />
                      </TableCell>
                    )}
                    {columns.map((c) => (
                      <TableCell key={c.key} numeric={c.numeric} className={cn(c.hideBelow && hide[c.hideBelow], c.className)}>{c.cell(row)}</TableCell>
                    ))}
                  </TableRow>
                )
              })}
          {!loading && rows.length === 0 && (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={colCount} className="p-0">
                {empty ?? <EmptyState icon={<SearchX />} title={t.noResults} description={t.noResultsHint} />}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pagination && pagination.total > 0 && <Pagination {...pagination} className="border-t px-4 py-3" />}
    </div>
  )
}
