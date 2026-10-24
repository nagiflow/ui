"use client"
import * as React from "react"
import { Download, Laptop, MoreHorizontal, Smartphone, UserPlus, Search } from "lucide-react"
import { cn } from "../../lib/utils.ts"
import { Button } from "../../components/button.tsx"
import { Badge } from "../../components/badge.tsx"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/card.tsx"
import { Field } from "../../components/field.tsx"
import { Input, Textarea } from "../../components/input.tsx"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectField } from "../../components/select.tsx"
import { Switch } from "../../components/checkbox.tsx"
import { Avatar, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, Progress } from "../../components/menu.tsx"
import { ConfirmDialog, Dialog, DialogClose, DialogBody, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/overlay.tsx"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/table.tsx"
import { FormSection, StickyFormActions } from "./layouts.tsx"
import { useDashboardStrings } from "./strings.ts"

type Errors<T> = Partial<Record<keyof T, string>>
type Option = { value: string; label: string }

/**
 * Select usable as a <Field> child: Field's id / aria-* land on the trigger, so the label and
 * error are wired up (a bare <Select> root would drop them).
 */
const formValues = <T,>(e: React.FormEvent<HTMLFormElement>) => Object.fromEntries(new FormData(e.currentTarget)) as T

/* ---------------- Profile ---------------- */

export type ProfileValues = { fullName: string; displayName: string; email: string; jobTitle: string; bio: string; language: string; timezone: string }

export interface ProfileSettingsProps {
  defaultValues: Partial<ProfileValues> & { avatarUrl?: string }
  languages: Option[]
  timezones: Option[]
  onSave?: (values: ProfileValues) => void
  errors?: Errors<ProfileValues>
  saving?: boolean
}

export function ProfileSettings({ defaultValues: v, languages, timezones, onSave, errors = {}, saving }: ProfileSettingsProps) {
  const t = useDashboardStrings()
  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); onSave?.(formValues(e)) }}>
      <FormSection title={t.profile} description={t.profileDesc}>
        <div className="flex items-center gap-4">
          <Avatar name={v.displayName || v.fullName || "?"} src={v.avatarUrl} className="size-16 text-base" />
          <div>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" size="sm">{t.changePhoto}</Button>
              <Button type="button" variant="ghost" size="sm">{t.removePhoto}</Button>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">{t.photoHint}</p>
          </div>
        </div>
        <Field label={t.fullName} required error={errors.fullName}><Input name="fullName" defaultValue={v.fullName} autoComplete="name" /></Field>
        <Field label={t.displayName} required error={errors.displayName}><Input name="displayName" defaultValue={v.displayName} autoComplete="nickname" /></Field>
        <Field label={t.email} required description={t.emailHint} error={errors.email}><Input name="email" type="email" defaultValue={v.email} autoComplete="email" /></Field>
        <Field label={t.jobTitle} optional error={errors.jobTitle}><Input name="jobTitle" defaultValue={v.jobTitle} autoComplete="organization-title" /></Field>
        <Field label={t.bio} optional error={errors.bio}><Textarea name="bio" defaultValue={v.bio} rows={3} /></Field>
      </FormSection>
      <FormSection title={t.regional} description={t.regionalDesc}>
        <Field label={t.language}><SelectField name="language" defaultValue={v.language} options={languages} /></Field>
        <Field label={t.timezone}><SelectField name="timezone" defaultValue={v.timezone} options={timezones} /></Field>
      </FormSection>
      <StickyFormActions>
        <Button type="reset" variant="secondary">{t.cancel}</Button>
        <Button type="submit" disabled={saving}>{saving ? t.saving : t.save}</Button>
      </StickyFormActions>
    </form>
  )
}

/* ---------------- Members ---------------- */

export type Member = { id: string; name: string; email: string; role: string; status: "active" | "invited" | "suspended"; lastActive?: string; avatarUrl?: string }

export interface MembersSettingsProps {
  members: Member[]
  roles: Option[]
  statusLabels: Record<Member["status"], string>
  /** Id of the signed-in user; they can't remove themselves. */
  currentUserId?: string
  onInvite?: (emails: string[], role: string) => void
  onRoleChange?: (id: string, role: string) => void
  onRemove?: (id: string) => void
  onResend?: (id: string) => void
}

export function MembersSettings({ members, roles, statusLabels, currentUserId, onInvite, onRoleChange, onRemove, onResend }: MembersSettingsProps) {
  const t = useDashboardStrings()
  const [q, setQ] = React.useState("")
  const [removing, setRemoving] = React.useState<Member | null>(null)
  const roleLabel = (r: string) => roles.find((x) => x.value === r)?.label ?? r
  const shown = members.filter((m) => !q || `${m.name} ${m.email}`.toLowerCase().includes(q.toLowerCase()))
  const statusVariant = { active: "success", invited: "warning", suspended: "neutral" } as const

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold">{t.members}</h2>
          <p className="mt-0.5 text-sm text-muted-foreground">{t.membersDesc(members.length)}</p>
        </div>
        <InviteDialog roles={roles} onInvite={onInvite} />
      </div>
      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="border-b px-4 py-3">
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.name + "・" + t.email} aria-label={t.name + "・" + t.email} className="h-9 pl-9" />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>{t.name}</TableHead>
              <TableHead>{t.role}</TableHead>
              <TableHead className="hidden md:table-cell">{t.status}</TableHead>
              <TableHead className="hidden lg:table-cell">{t.lastActive}</TableHead>
              <TableHead className="w-12"><span className="sr-only">{t.actions}</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shown.map((m) => (
              <TableRow key={m.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={m.name} src={m.avatarUrl} />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{m.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{roleLabel(m.role)}</TableCell>
                <TableCell className="hidden md:table-cell"><Badge variant={statusVariant[m.status]}>{statusLabels[m.status]}</Badge></TableCell>
                <TableCell className="hidden text-muted-foreground tabular-nums lg:table-cell">{m.lastActive ?? "—"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" aria-label={`${m.name} ${t.actions}`}><MoreHorizontal /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {roles.map((r) => (
                        <DropdownMenuItem key={r.value} disabled={r.value === m.role} onSelect={() => onRoleChange?.(m.id, r.value)}>
                          {t.changeRole}：{r.label}
                        </DropdownMenuItem>
                      ))}
                      {m.status === "invited" && <DropdownMenuItem onSelect={() => onResend?.(m.id)}>{t.resendInvite}</DropdownMenuItem>}
                      {m.id !== currentUserId && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem destructive onSelect={() => setRemoving(m)}>{t.remove}</DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {shown.length === 0 && (
              <TableRow className="hover:bg-transparent"><TableCell colSpan={5} className="py-12 text-center text-muted-foreground">{t.noResults}</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ConfirmDialog
        open={!!removing}
        onOpenChange={(o) => !o && setRemoving(null)}
        title={removing ? t.removeTitle(removing.name) : ""}
        description={t.removeDesc}
        confirmLabel={t.removeConfirm}
        onConfirm={() => removing && onRemove?.(removing.id)}
      />
    </div>
  )
}

function InviteDialog({ roles, onInvite }: { roles: Option[]; onInvite?: (emails: string[], role: string) => void }) {
  const t = useDashboardStrings()
  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState<string>()
  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); setError(undefined) }}>
      <DialogTrigger asChild><Button><UserPlus />{t.invite}</Button></DialogTrigger>
      <DialogContent>
        <form noValidate onSubmit={(e) => {
          e.preventDefault()
          const { emails, role } = formValues<{ emails: string; role: string }>(e)
          const list = emails.split(/[\s,、]+/).filter(Boolean)
          const bad = list.find((x) => !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x))
          if (!list.length || bad) return setError(bad ? t.invalidEmail(bad) : t.emailRequired)
          onInvite?.(list, role)
          setOpen(false)
        }}>
          <DialogHeader>
            <DialogTitle>{t.invite}</DialogTitle>
            <DialogDescription>{t.inviteDesc}</DialogDescription>
          </DialogHeader>
          <DialogBody className="grid gap-5">
            <Field label={t.email} required description={t.inviteEmailsHint} error={error}>
              <Textarea name="emails" rows={3} placeholder="name@example.com" />
            </Field>
            <Field label={t.role}><SelectField name="role" defaultValue={roles[roles.length - 1]?.value} options={roles} /></Field>
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>{t.cancel}</Button>
            <Button type="submit">{t.inviteSend}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/* ---------------- Notifications ---------------- */

export type NotificationEvent = { key: string; label: string; description?: string }
export type NotificationGroup = { title: string; events: NotificationEvent[] }

export interface NotificationSettingsProps {
  channels: Option[]
  groups: NotificationGroup[]
  /** event key -> enabled channel values */
  value: Record<string, string[]>
  onChange?: (value: Record<string, string[]>) => void
}

export function NotificationSettings({ channels, groups, value, onChange }: NotificationSettingsProps) {
  const t = useDashboardStrings()
  const toggle = (ev: string, ch: string, on: boolean) => {
    const cur = value[ev] ?? []
    onChange?.({ ...value, [ev]: on ? [...cur, ch] : cur.filter((c) => c !== ch) })
  }
  return (
    <div className="grid gap-4">
      <div>
        <h2 className="text-base font-semibold">{t.notificationsTitle}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{t.notificationsDesc}</p>
      </div>
      {groups.map((g) => (
        <Card key={g.title}>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-full">{g.title}</TableHead>
                {channels.map((c) => <TableHead key={c.value} className="text-center">{c.label}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {g.events.map((ev) => (
                <TableRow key={ev.key} className="hover:bg-transparent">
                  <TableCell>
                    <p className="font-medium">{ev.label}</p>
                    {ev.description && <p className="mt-0.5 text-xs text-muted-foreground">{ev.description}</p>}
                  </TableCell>
                  {channels.map((c) => (
                    <TableCell key={c.value} className="text-center">
                      <Switch aria-label={`${ev.label}：${c.label}`} checked={(value[ev.key] ?? []).includes(c.value)} onCheckedChange={(on) => toggle(ev.key, c.value, on)} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ))}
    </div>
  )
}

/* ---------------- Billing ---------------- */

export type Usage = { label: string; used: number; limit: number; unit?: string }
export type Invoice = { id: string; date: string; number: string; amount: string; status: "paid" | "due" | "failed" }

export interface BillingSettingsProps {
  plan: { name: string; price: string; interval: string; renewsOn: string; description?: string }
  usage: Usage[]
  invoices: Invoice[]
  invoiceStatusLabels: Record<Invoice["status"], string>
  paymentMethod?: { label: string; detail?: string }
  onChangePlan?: () => void
  onEditPayment?: () => void
  onDownload?: (id: string) => void
}

export function BillingSettings({ plan, usage, invoices, invoiceStatusLabels, paymentMethod, onChangePlan, onEditPayment, onDownload }: BillingSettingsProps) {
  const t = useDashboardStrings()
  const statusVariant = { paid: "success", due: "warning", failed: "destructive" } as const
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardDescription className="mt-0">{t.currentPlan}</CardDescription>
              <CardTitle className="mt-1 text-xl">{plan.name}</CardTitle>
            </div>
            <Badge variant="brand">{plan.interval}</Badge>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">{plan.price}</p>
            {plan.description && <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>}
            <p className="mt-3 text-sm text-muted-foreground">{t.nextBilling(plan.renewsOn)}</p>
          </CardContent>
          <CardFooter><Button variant="secondary" onClick={onChangePlan}>{t.changePlan}</Button></CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>{t.usage}</CardTitle>
              <CardDescription>{t.usageDesc}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-5">
            {usage.map((u) => {
              const pct = Math.min(100, Math.round((u.used / u.limit) * 100))
              return (
                <div key={u.label}>
                  <div className="mb-2 flex items-baseline justify-between gap-2 text-sm">
                    <span className="font-medium">{u.label}</span>
                    <span className={cn("tabular-nums text-muted-foreground", pct >= 90 && "font-semibold text-destructive")}>
                      {u.used.toLocaleString()} / {u.limit.toLocaleString()}{u.unit}
                    </span>
                  </div>
                  <Progress value={pct} className={cn(pct >= 90 && "[&>div]:bg-destructive")} />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
      {paymentMethod && (
        <Card>
          <CardHeader className="items-center pb-5">
            <div>
              <CardTitle>{t.paymentMethod}</CardTitle>
              <p className="mt-1 text-sm">{paymentMethod.label}{paymentMethod.detail && <span className="ml-2 text-muted-foreground">{paymentMethod.detail}</span>}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={onEditPayment}>{t.edit}</Button>
          </CardHeader>
        </Card>
      )}
      <Card>
        <CardHeader><CardTitle>{t.invoices}</CardTitle></CardHeader>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>{t.invoiceDate}</TableHead>
              <TableHead className="hidden sm:table-cell">{t.invoiceNumber}</TableHead>
              <TableHead>{t.status}</TableHead>
              <TableHead numeric>{t.amount}</TableHead>
              <TableHead className="w-12"><span className="sr-only">{t.download}</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="tabular-nums">{inv.date}</TableCell>
                <TableCell className="hidden font-mono text-xs text-muted-foreground sm:table-cell">{inv.number}</TableCell>
                <TableCell><Badge variant={statusVariant[inv.status]}>{invoiceStatusLabels[inv.status]}</Badge></TableCell>
                <TableCell numeric>{inv.amount}</TableCell>
                <TableCell><Button variant="ghost" size="icon-sm" aria-label={`${inv.number} ${t.download}`} onClick={() => onDownload?.(inv.id)}><Download /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

/* ---------------- Security ---------------- */

export type Session = { id: string; device: string; location: string; lastActive: string; current?: boolean; mobile?: boolean }
export type PasswordValues = { currentPassword: string; newPassword: string }

export interface SecuritySettingsProps {
  passwordChangedAt: string
  twoFactorEnabled: boolean
  onTwoFactorChange?: (on: boolean) => void
  sessions: Session[]
  onSignOutSession?: (id: string) => void
  onSignOutOthers?: () => void
  onChangePassword?: (values: PasswordValues) => void
  passwordErrors?: Errors<PasswordValues>
}

export function SecuritySettings({ passwordChangedAt, twoFactorEnabled, onTwoFactorChange, sessions, onSignOutSession, onSignOutOthers, onChangePassword, passwordErrors = {} }: SecuritySettingsProps) {
  const t = useDashboardStrings()
  return (
    <div>
      <form noValidate onSubmit={(e) => { e.preventDefault(); onChangePassword?.(formValues(e)) }}>
        <FormSection title={t.password} description={t.passwordDesc + passwordChangedAt} footer={<Button type="submit" variant="secondary">{t.changePassword}</Button>}>
          <Field label={t.currentPassword} required error={passwordErrors.currentPassword}><Input name="currentPassword" type="password" autoComplete="current-password" /></Field>
          <Field label={t.newPassword} required description={t.newPasswordHint} error={passwordErrors.newPassword}><Input name="newPassword" type="password" autoComplete="new-password" /></Field>
        </FormSection>
      </form>
      <FormSection title={t.twoFactor} description={t.twoFactorDesc}>
        <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4">
          <span>
            <span className="block text-sm font-medium">{t.twoFactor}</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">{twoFactorEnabled ? t.enabled : t.disabled}</span>
          </span>
          <Switch checked={twoFactorEnabled} onCheckedChange={onTwoFactorChange} />
        </label>
      </FormSection>
      <FormSection title={t.sessions} description={t.sessionsDesc} footer={sessions.some((s) => !s.current) && <ConfirmDialog trigger={<Button variant="secondary">{t.signOutOthers}</Button>} title={t.signOutOthers + "？"} confirmLabel={t.signOutOthers} onConfirm={onSignOutOthers} />}>
        <ul className="divide-y rounded-lg border">
          {sessions.map((s) => (
            <li key={s.id} className="flex items-center gap-3 p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">{s.mobile ? <Smartphone className="size-4" /> : <Laptop className="size-4" />}</span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-medium">{s.device}{s.current && <Badge variant="brand">{t.thisDevice}</Badge>}</p>
                <p className="truncate text-xs text-muted-foreground">{s.location} · {s.lastActive}</p>
              </div>
              {!s.current && <Button variant="ghost" size="sm" onClick={() => onSignOutSession?.(s.id)}>{t.signOutDevice}</Button>}
            </li>
          ))}
        </ul>
      </FormSection>
    </div>
  )
}

/* ---------------- Danger zone ---------------- */

/** Irreversible delete. User must type the workspace name to enable the button. */
export function DangerZone({ workspaceName, onDelete }: { workspaceName: string; onDelete?: () => void }) {
  const t = useDashboardStrings()
  const [typed, setTyped] = React.useState("")
  return (
    <section className="rounded-lg border border-destructive/40">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold">{t.dangerZone}</h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">{t.dangerDesc}</p>
        </div>
        <Dialog onOpenChange={() => setTyped("")}>
          <DialogTrigger asChild><Button variant="destructive" className="shrink-0">{t.deleteWorkspace}</Button></DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{t.deleteTitle(workspaceName)}</DialogTitle>
              <DialogDescription>{t.dangerDesc}</DialogDescription>
            </DialogHeader>
            <DialogBody>
              <Field label={t.typeToConfirm(workspaceName)}>
                <Input value={typed} onChange={(e) => setTyped(e.target.value)} autoComplete="off" />
              </Field>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild><Button variant="secondary">{t.cancel}</Button></DialogClose>
              <Button variant="destructive" disabled={typed !== workspaceName} onClick={onDelete}>{t.deleteConfirm}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
