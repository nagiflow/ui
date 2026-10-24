import * as React from "react"
import { cn } from "../../lib/utils.ts"
import { Breadcrumb, type Crumb } from "../../components/feedback.tsx"

export interface PageHeaderProps {
  /** Must match the nav label of the page so users never wonder where they are. */
  title: React.ReactNode
  description?: React.ReactNode
  breadcrumb?: Crumb[]
  /** The single primary action. Always rendered last (right-most). */
  primaryAction?: React.ReactNode
  secondaryActions?: React.ReactNode
  /** Badges / meta next to the title (status, id). */
  meta?: React.ReactNode
  /** Tabs rendered under the header, flush with its bottom border. */
  tabs?: React.ReactNode
  linkAs?: React.ElementType
  className?: string
}

export function PageHeader({ title, description, breadcrumb, primaryAction, secondaryActions, meta, tabs, linkAs, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-8", tabs && "mb-0", className)}>
      {breadcrumb && <Breadcrumb items={breadcrumb} linkAs={linkAs} className="mb-3" />}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {meta}
          </div>
          {description && <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>}
        </div>
        {(primaryAction || secondaryActions) && (
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {secondaryActions}
            {primaryAction}
          </div>
        )}
      </div>
      {tabs && <div className="mt-6">{tabs}</div>}
    </div>
  )
}
