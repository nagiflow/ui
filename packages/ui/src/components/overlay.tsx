"use client"
import * as React from "react"
import { Dialog as DialogPrimitive, AlertDialog as AlertDialogPrimitive } from "radix-ui"
import { X } from "lucide-react"
import { cn } from "../lib/utils.ts"
import { useStrings } from "../lib/locale.tsx"
import { buttonVariants } from "./button.tsx"

const overlay = "fixed inset-0 z-50 bg-black/45"
const panel = "fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-0 rounded-lg border bg-popover text-popover-foreground shadow-xl"

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogClose = DialogPrimitive.Close

export function DialogContent({ className, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content>) {
  const t = useStrings()
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={overlay} />
      <DialogPrimitive.Content className={cn(panel, className)} {...props}>
        {children}
        <DialogPrimitive.Close className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "absolute top-3 right-3")} aria-label={t.close}>
          <X />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

export function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-1 border-b px-6 py-4 pr-12", className)} {...props} />
}
export function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-6 py-5", className)} {...props} />
}
export function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col-reverse gap-2 border-t px-6 py-4 sm:flex-row sm:justify-end", className)} {...props} />
}
export function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={cn("text-lg font-semibold leading-snug", className)} {...props} />
}
export function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description className={cn("text-sm text-muted-foreground", className)} {...props} />
}

/** Side panel. Used for mobile navigation and filter drawers. */
export function SheetContent({ className, side = "left", children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & { side?: "left" | "right" }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={overlay} />
      <DialogPrimitive.Content className={cn("fixed inset-y-0 z-50 flex w-80 max-w-[85vw] flex-col bg-background shadow-xl", side === "left" ? "left-0 border-r" : "right-0 border-l", className)} {...props}>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

/**
 * Confirmation for destructive / irreversible actions.
 * Rule: the confirm button repeats the verb ("削除する"), never a bare "OK".
 */
export function ConfirmDialog({
  trigger, title, description, confirmLabel, cancelLabel, destructive = true, onConfirm, open, onOpenChange,
}: {
  trigger?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  confirmLabel: React.ReactNode
  cancelLabel?: React.ReactNode
  destructive?: boolean
  onConfirm?: () => void
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const t = useStrings()
  return (
    <AlertDialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogPrimitive.Trigger asChild>{trigger}</AlertDialogPrimitive.Trigger>}
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className={overlay} />
        <AlertDialogPrimitive.Content className={cn(panel, "max-w-md")}>
          <div className="grid gap-2 px-6 pt-6 pb-5">
            <AlertDialogPrimitive.Title className="text-lg font-semibold leading-snug">{title}</AlertDialogPrimitive.Title>
            {description && <AlertDialogPrimitive.Description className="text-sm leading-relaxed text-muted-foreground">{description}</AlertDialogPrimitive.Description>}
          </div>
          <div className="flex flex-col-reverse gap-2 px-6 pb-6 sm:flex-row sm:justify-end">
            <AlertDialogPrimitive.Cancel className={buttonVariants({ variant: "secondary" })}>{cancelLabel ?? t.cancel}</AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action className={buttonVariants({ variant: destructive ? "destructive" : "primary" })} onClick={onConfirm}>{confirmLabel}</AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}
