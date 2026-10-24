import type { Meta, StoryObj } from "@storybook/react-vite"
import { AuthLayout, ForgotPasswordForm, LoginForm, SignupForm } from "../../blocks/dashboard/index.ts"
import { BrandMark, DemoLink } from "./demo-shell.tsx"

const meta: Meta = { title: "Auth/Pages", parameters: { layout: "fullscreen" } }
export default meta

const aside = (
  <div className="relative max-w-md">
    <svg viewBox="0 0 400 240" className="mb-12 w-full text-brand-surface-foreground/25" aria-hidden>
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M0 ${200 - i * 28} C 100 ${170 - i * 28}, 200 ${230 - i * 28}, 400 ${180 - i * 28}`} fill="none" stroke="currentColor" strokeWidth={1.5} />
      ))}
      <path d="M0 60 C 100 30, 200 90, 400 40" fill="none" stroke="var(--primary)" strokeWidth={2.5} />
    </svg>
    <p className="text-2xl leading-snug font-semibold">チームの仕事を、<br />迷わず進める。</p>
    <p className="mt-3 text-sm leading-relaxed text-brand-surface-foreground/70">プロジェクト・タスク・メンバーをひとつの場所で。誰が何をいつまでにやるのかが、ひと目でわかります。</p>
  </div>
)
const footer = <>© 2026 nagiflow · <DemoLink href="/terms" className="hover:underline">利用規約</DemoLink> · <DemoLink href="/privacy" className="hover:underline">プライバシーポリシー</DemoLink></>
const Frame = ({ children }: { children: React.ReactNode }) => <AuthLayout brand={<BrandMark />} aside={aside} footer={footer}>{children}</AuthLayout>

export const Login: StoryObj = { render: () => <Frame><LoginForm linkAs={DemoLink} forgotHref="/forgot" signupHref="/signup" onSso={() => {}} /></Frame> }
export const LoginError: StoryObj = {
  name: "Login · wrong credentials",
  render: () => <Frame><LoginForm linkAs={DemoLink} forgotHref="/forgot" signupHref="/signup" defaultEmail="misaki.sato@example.com" error="メールアドレスまたはパスワードが正しくありません。5回間違えると30分間ログインできなくなります。" /></Frame>,
}
export const Signup: StoryObj = { render: () => <Frame><SignupForm linkAs={DemoLink} loginHref="/login" /></Frame> }
export const SignupErrors: StoryObj = {
  name: "Signup · validation errors",
  render: () => <Frame><SignupForm linkAs={DemoLink} loginHref="/login" errors={{ fullName: "氏名を入力してください。", email: "このメールアドレスはすでに登録されています。ログインしてください。", password: "12文字以上で入力してください。", agree: "利用規約への同意が必要です。" }} /></Frame>,
}
export const ForgotPassword: StoryObj = { render: () => <Frame><ForgotPasswordForm linkAs={DemoLink} loginHref="/login" /></Frame> }
export const ForgotPasswordSent: StoryObj = { name: "Forgot password · sent", render: () => <Frame><ForgotPasswordForm linkAs={DemoLink} loginHref="/login" sentTo="misaki.sato@example.com" /></Frame> }
