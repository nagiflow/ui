"use client"
import * as React from "react"

const strings = {
  ja: { required: "必須", optional: "任意", close: "閉じる", cancel: "キャンセル", previous: "前へ", next: "次へ", search: "検索", menu: "メニュー", breadcrumb: "パンくずリスト", pagination: "ページ送り", billingPeriod: "支払いサイクル", included: "含まれる", notIncluded: "含まれない", language: "言語", of: (from: number, to: number, total: number) => `${total}件中 ${from}〜${to}件` },
  en: { required: "Required", optional: "Optional", close: "Close", cancel: "Cancel", previous: "Previous", next: "Next", search: "Search", menu: "Menu", breadcrumb: "Breadcrumb", pagination: "Pagination", billingPeriod: "Billing period", included: "Included", notIncluded: "Not included", language: "Language", of: (from: number, to: number, total: number) => `${from}–${to} of ${total}` },
}
export type Locale = keyof typeof strings

const LocaleContext = React.createContext<Locale>("ja")

/** Built-in UI strings only. Page copy is always passed in via props. */
export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useStrings() {
  return strings[React.useContext(LocaleContext)]
}

/** Current locale, for blocks that ship their own string tables. */
export function useLocale() {
  return React.useContext(LocaleContext)
}
