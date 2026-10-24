import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Button, Field, Input } from "../../index.ts"
import { BillingSettings, DangerZone, FormSection, MembersSettings, NotificationSettings, ProfileSettings, SecuritySettings } from "../../blocks/dashboard/index.ts"
import { currentUser, invoices, members, memberStatusLabels, notificationChannels, notificationGroups, notificationValue, roles, sessions, workspace } from "../fixtures/dashboard.ts"
import { SettingsPage } from "./demo-shell.tsx"

const meta: Meta = { title: "Settings/Pages", parameters: { layout: "fullscreen" } }
export default meta

const languages = [{ value: "ja", label: "日本語" }, { value: "en", label: "English" }]
const timezones = [{ value: "Asia/Tokyo", label: "(UTC+09:00) 東京" }, { value: "UTC", label: "(UTC+00:00) 協定世界時" }, { value: "America/Los_Angeles", label: "(UTC-08:00) ロサンゼルス" }]
const profile = { fullName: currentUser.name, displayName: "みさき", email: currentUser.email, jobTitle: "プロダクトマネージャー", language: "ja", timezone: "Asia/Tokyo" }

export const Profile: StoryObj = {
  render: () => <SettingsPage path="/settings/profile"><ProfileSettings defaultValues={profile} languages={languages} timezones={timezones} /></SettingsPage>,
}

export const ProfileErrors: StoryObj = {
  name: "Profile · validation errors",
  render: () => (
    <SettingsPage path="/settings/profile">
      <ProfileSettings defaultValues={{ ...profile, displayName: "", email: "misaki.sato@" }} languages={languages} timezones={timezones}
        errors={{ displayName: "表示名を入力してください。", email: "メールアドレスの形式が正しくありません。例：name@example.com" }} />
    </SettingsPage>
  ),
}

export const Notifications: StoryObj = {
  render: function Render() {
    const [value, setValue] = React.useState(notificationValue)
    return <SettingsPage path="/settings/notifications"><NotificationSettings channels={notificationChannels} groups={notificationGroups} value={value} onChange={setValue} /></SettingsPage>
  },
}

export const Security: StoryObj = {
  render: function Render() {
    const [on, setOn] = React.useState(true)
    return <SettingsPage path="/settings/security"><SecuritySettings passwordChangedAt="2026/06/14" twoFactorEnabled={on} onTwoFactorChange={setOn} sessions={sessions} /></SettingsPage>
  },
}

export const Members: StoryObj = {
  render: () => <SettingsPage path="/settings/members"><MembersSettings members={members} roles={roles} statusLabels={memberStatusLabels} currentUserId={currentUser.id} /></SettingsPage>,
}

export const Billing: StoryObj = {
  render: () => (
    <SettingsPage path="/settings/billing">
      <BillingSettings
        plan={{ name: "ビジネス", price: "¥99,000 / 月", interval: "月払い", renewsOn: "2026/11/01", description: "50ユーザーまで・すべての機能" }}
        usage={[{ label: "ユーザー", used: 38, limit: 50, unit: "人" }, { label: "ストレージ", used: 92, limit: 100, unit: "GB" }, { label: "自動化の実行", used: 4120, limit: 10000, unit: "回" }]}
        invoices={invoices}
        invoiceStatusLabels={{ paid: "支払い済み", due: "未払い", failed: "決済失敗" }}
        paymentMethod={{ label: "クレジットカード •••• 4242", detail: "有効期限 08/28" }}
      />
    </SettingsPage>
  ),
}

export const Workspace: StoryObj = {
  render: () => (
    <SettingsPage path="/settings/workspace">
      <form onSubmit={(e) => e.preventDefault()} className="mb-8">
        <FormSection title="ワークスペース" description="メンバー全員に表示されます。" footer={<Button type="submit">保存する</Button>}>
          <Field label="ワークスペース名" required><Input defaultValue={workspace} /></Field>
          <Field label="URL" description="変更すると、以前のURLは使えなくなります。">
            <Input defaultValue="demo" className="font-mono" />
          </Field>
        </FormSection>
      </form>
      <DangerZone workspaceName={workspace} />
    </SettingsPage>
  ),
}
