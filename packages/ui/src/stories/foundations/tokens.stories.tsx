import type { Meta, StoryObj } from "@storybook/react-vite"

const colors = ["background", "foreground", "card", "muted", "muted-foreground", "border", "input", "primary", "primary-hover", "accent", "accent-foreground", "ring", "destructive", "success", "warning", "info", "sidebar", "brand-surface"]

const meta: Meta = { title: "Foundations/Tokens" }
export default meta

export const Colors: StoryObj = {
  render: () => (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {colors.map((c) => (
        <div key={c} className="overflow-hidden rounded-md border">
          <div className="h-14" style={{ background: `var(--${c})` }} />
          <p className="px-2.5 py-2 font-mono text-xs">--{c}</p>
        </div>
      ))}
    </div>
  ),
}

export const Typography: StoryObj = {
  render: () => (
    <div className="grid max-w-3xl gap-8">
      {[
        ["Display / LP h1", "text-4xl sm:text-5xl font-semibold tracking-tight", "データと業務を、ひとつの流れに。"],
        ["LP h2", "text-3xl font-semibold tracking-tight", "現場の判断を、速く確かに。"],
        ["Page title", "text-2xl font-semibold", "プロジェクト一覧"],
        ["Section title", "text-lg font-semibold", "基本情報"],
        ["Body", "text-base leading-[1.8]", "入力した情報は自動で保存され、関係するメンバーにだけ通知されます。迷ったときは画面上部のパンくずリストから、いつでも元の場所に戻れます。"],
        ["UI / Small", "text-sm", "最終更新：2026年10月24日 18:02"],
        ["Caption", "text-xs text-muted-foreground", "半角英数字8文字以上で入力してください"],
        ["Eyebrow (mono)", "font-mono text-xs tracking-[0.16em] uppercase text-muted-foreground", "Workflow automation"],
      ].map(([name, cls, text]) => (
        <div key={name} className="grid gap-1 border-b pb-6">
          <p className="font-mono text-[11px] text-muted-foreground">{name} — {cls}</p>
          <p className={cls}>{text}</p>
        </div>
      ))}
    </div>
  ),
}
