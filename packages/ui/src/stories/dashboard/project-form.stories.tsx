import type { Meta, StoryObj } from "@storybook/react-vite"
import { Alert, Button, Field, Input, RadioGroup, RadioGroupItem, Label, Textarea, Checkbox } from "../../index.ts"
import { FormSection, PageContainer, PageHeader, StickyFormActions } from "../../blocks/dashboard/index.ts"
import { SelectField } from "../../index.ts"
import { departments, members } from "../fixtures/dashboard.ts"
import { DemoLink, DemoShell } from "./demo-shell.tsx"

const meta: Meta = { title: "Dashboard/Pages/New project", parameters: { layout: "fullscreen" } }
export default meta

type Errors = Partial<Record<"name" | "department" | "owner" | "start" | "due" | "budget", string>>

function NewProject({ errors = {} }: { errors?: Errors }) {
  const count = Object.keys(errors).length
  return (
    <DemoShell currentPath="/projects/new">
      <PageContainer size="narrow">
        <PageHeader
          linkAs={DemoLink}
          breadcrumb={[{ label: "プロジェクト", href: "/projects" }, { label: "新規プロジェクト" }]}
          title="新規プロジェクト"
          description="作成後もすべての項目を変更できます。"
        />
        <form noValidate onSubmit={(e) => e.preventDefault()}>
          {count > 0 && (
            <Alert variant="destructive" title={`${count}件の項目を確認してください`} className="mb-8">
              赤く表示された項目を修正してから、もう一度作成してください。
            </Alert>
          )}
          <FormSection title="基本情報" description="一覧や通知に表示される情報です。">
            <Field label="プロジェクト名" required error={errors.name} description="40文字以内。内容がひと目でわかる名前にしてください。">
              <Input name="name" maxLength={40} defaultValue={errors.name ? "" : undefined} />
            </Field>
            <Field label="概要" optional>
              <Textarea name="summary" rows={4} placeholder="目的・ゴール・スコープなど" />
            </Field>
          </FormSection>
          <FormSection title="担当" description="責任者には期限や遅延の通知が届きます。">
            <Field label="部署" required error={errors.department}>
              <SelectField name="department" placeholder="選択してください" options={departments.map((d) => ({ value: d, label: d }))} />
            </Field>
            <Field label="責任者" required error={errors.owner}>
              <SelectField name="owner" placeholder="選択してください" options={members.map((m) => ({ value: m.id, label: m.name }))} />
            </Field>
          </FormSection>
          <FormSection title="期間と予算">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="開始日" required error={errors.start}><Input name="start" type="date" /></Field>
              <Field label="期限" required error={errors.due}><Input name="due" type="date" /></Field>
            </div>
            <Field label="予算" optional error={errors.budget} description="税抜・円">
              <Input name="budget" inputMode="numeric" className="text-right tabular-nums sm:max-w-56" placeholder="0" defaultValue={errors.budget ? "1200万" : undefined} />
            </Field>
          </FormSection>
          <FormSection title="公開範囲">
            <RadioGroup name="visibility" defaultValue="workspace">
              <div className="flex items-start gap-3">
                <RadioGroupItem value="workspace" id="v1" className="mt-0.5" />
                <Label htmlFor="v1" className="grid gap-0.5 font-normal"><span className="font-semibold">ワークスペース全体</span><span className="text-xs text-muted-foreground">すべてのメンバーが閲覧できます。</span></Label>
              </div>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="private" id="v2" className="mt-0.5" />
                <Label htmlFor="v2" className="grid gap-0.5 font-normal"><span className="font-semibold">参加メンバーのみ</span><span className="text-xs text-muted-foreground">招待したメンバーだけが閲覧できます。</span></Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2.5">
              <Checkbox id="notify" defaultChecked />
              <Label htmlFor="notify" className="font-normal">作成したことを参加メンバーに通知する</Label>
            </div>
          </FormSection>
          <StickyFormActions>
            <Button type="button" variant="secondary">キャンセル</Button>
            <Button type="submit">作成する</Button>
          </StickyFormActions>
        </form>
      </PageContainer>
    </DemoShell>
  )
}

export const Default: StoryObj = { render: () => <NewProject /> }
export const ValidationErrors: StoryObj = {
  name: "Validation errors",
  render: () => (
    <NewProject errors={{ name: "プロジェクト名を入力してください。", owner: "責任者を選択してください。", due: "期限は開始日より後の日付にしてください。", budget: "半角数字で入力してください。" }} />
  ),
}
