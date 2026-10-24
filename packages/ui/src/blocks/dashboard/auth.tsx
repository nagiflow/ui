"use client"
import * as React from "react"
import { DefaultLink } from "../../lib/link.tsx"
import { cn } from "../../lib/utils.ts"
import { Button } from "../../components/button.tsx"
import { Checkbox } from "../../components/checkbox.tsx"
import { Field, Label } from "../../components/field.tsx"
import { Input } from "../../components/input.tsx"
import { Alert } from "../../components/feedback.tsx"
import { useDashboardStrings } from "./strings.ts"

export interface AuthLayoutProps {
  /** Logo + product name, top-left of the form column. */
  brand: React.ReactNode
  children: React.ReactNode
  /** Right panel content (value prop, quote, product visual). Hidden below lg. */
  aside?: React.ReactNode
  /** Small print under the form (legal links, copyright). */
  footer?: React.ReactNode
  className?: string
}

export function AuthLayout({ brand, children, aside, footer, className }: AuthLayoutProps) {
  return (
    <div className={cn("grid min-h-svh bg-background lg:grid-cols-2", className)}>
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <div className="flex items-center gap-2 font-semibold">{brand}</div>
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
        {footer && <div className="text-xs text-muted-foreground">{footer}</div>}
      </div>
      {aside && (
        <div className="relative hidden overflow-hidden bg-brand-surface text-brand-surface-foreground lg:flex lg:flex-col lg:justify-end lg:p-12">
          {aside}
        </div>
      )}
    </div>
  )
}

function AuthHeading({ title, description }: { title: React.ReactNode; description?: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}

const values = <T,>(e: React.FormEvent<HTMLFormElement>) => Object.fromEntries(new FormData(e.currentTarget)) as T

export type LoginValues = { email: string; password: string }

export interface LoginFormProps {
  onSubmit?: (v: LoginValues) => void
  errors?: Partial<Record<keyof LoginValues, string>>
  /** Form-level error (wrong credentials, locked account). */
  error?: React.ReactNode
  pending?: boolean
  forgotHref?: string
  signupHref?: string
  /** Show SSO button below the form. */
  onSso?: () => void
  linkAs?: React.ElementType
  defaultEmail?: string
}

export function LoginForm({ onSubmit, errors = {}, error, pending, forgotHref, signupHref, onSso, linkAs: Link = DefaultLink, defaultEmail }: LoginFormProps) {
  const t = useDashboardStrings()
  return (
    <>
      <AuthHeading title={t.loginTitle} description={t.loginDesc} />
      <form noValidate className="grid gap-5" onSubmit={(e) => { e.preventDefault(); onSubmit?.(values(e)) }}>
        {error && <Alert variant="destructive">{error}</Alert>}
        <Field label={t.email} error={errors.email}><Input name="email" type="email" autoComplete="email" defaultValue={defaultEmail} /></Field>
        <div className="grid gap-1.5">
          <Field label={t.password} error={errors.password}><Input name="password" type="password" autoComplete="current-password" /></Field>
          {forgotHref && <Link href={forgotHref} className="justify-self-end text-xs font-medium text-primary hover:underline">{t.forgot}</Link>}
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={pending}>{t.login}</Button>
      </form>
      {onSso && (
        <>
          <Divider label={t.or} />
          <Button variant="secondary" size="lg" className="w-full" onClick={onSso}>{t.continueWithSso}</Button>
        </>
      )}
      {signupHref && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t.noAccount} <Link href={signupHref} className="font-medium text-primary hover:underline">{t.signup}</Link>
        </p>
      )}
    </>
  )
}

export type SignupValues = { fullName: string; workspace: string; email: string; password: string; agree?: string }

export interface SignupFormProps {
  onSubmit?: (v: SignupValues) => void
  errors?: Partial<Record<keyof SignupValues, string>>
  error?: React.ReactNode
  pending?: boolean
  loginHref?: string
  linkAs?: React.ElementType
}

export function SignupForm({ onSubmit, errors = {}, error, pending, loginHref, linkAs: Link = DefaultLink }: SignupFormProps) {
  const t = useDashboardStrings()
  return (
    <>
      <AuthHeading title={t.signupTitle} description={t.signupDesc} />
      <form noValidate className="grid gap-5" onSubmit={(e) => { e.preventDefault(); onSubmit?.(values(e)) }}>
        {error && <Alert variant="destructive">{error}</Alert>}
        <Field label={t.fullName} required error={errors.fullName}><Input name="fullName" autoComplete="name" /></Field>
        <Field label={t.workspaceName} required error={errors.workspace}><Input name="workspace" autoComplete="organization" /></Field>
        <Field label={t.email} required error={errors.email}><Input name="email" type="email" autoComplete="email" /></Field>
        <Field label={t.password} required description={t.newPasswordHint} error={errors.password}><Input name="password" type="password" autoComplete="new-password" /></Field>
        <div className="grid gap-1.5">
          <div className="flex items-start gap-2.5">
            <Checkbox id="agree" name="agree" value="on" className="mt-0.5" aria-invalid={!!errors.agree || undefined} />
            <Label htmlFor="agree" className="font-normal">{t.agree}</Label>
          </div>
          {errors.agree && <p role="alert" className="text-xs font-medium text-destructive">{errors.agree}</p>}
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={pending}>{t.createAccount}</Button>
      </form>
      {loginHref && (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          {t.haveAccount} <Link href={loginHref} className="font-medium text-primary hover:underline">{t.login}</Link>
        </p>
      )}
    </>
  )
}

export interface ForgotPasswordFormProps {
  onSubmit?: (email: string) => void
  /** After submit: show confirmation instead of the form. */
  sentTo?: string
  error?: string
  loginHref?: string
  linkAs?: React.ElementType
}

export function ForgotPasswordForm({ onSubmit, sentTo, error, loginHref, linkAs: Link = DefaultLink }: ForgotPasswordFormProps) {
  const t = useDashboardStrings()
  return (
    <>
      {sentTo ? (
        <>
          <AuthHeading title={t.linkSent} />
          <Alert variant="success">{t.linkSentDesc(sentTo)}</Alert>
        </>
      ) : (
        <>
          <AuthHeading title={t.forgotTitle} description={t.forgotDesc} />
          <form noValidate className="grid gap-5" onSubmit={(e) => { e.preventDefault(); onSubmit?.(String(new FormData(e.currentTarget).get("email") ?? "")) }}>
            <Field label={t.email} error={error}><Input name="email" type="email" autoComplete="email" /></Field>
            <Button type="submit" size="lg" className="w-full">{t.sendLink}</Button>
          </form>
        </>
      )}
      {loginHref && (
        <p className="mt-8 text-center text-sm">
          <Link href={loginHref} className="font-medium text-primary hover:underline">{t.backToLogin}</Link>
        </p>
      )}
    </>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
      <span className="h-px flex-1 bg-border" />{label}<span className="h-px flex-1 bg-border" />
    </div>
  )
}
