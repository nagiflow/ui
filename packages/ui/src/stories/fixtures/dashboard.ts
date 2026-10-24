// Dummy data for the "projects & members" demo workspace. All names are invented.

export const workspace = "ナギフロー デモ株式会社"

export const currentUser = { id: "u1", name: "佐藤 美咲", email: "misaki.sato@example.com" }

export type ProjectStatus = "planning" | "active" | "at_risk" | "done"

export const projectStatus: Record<ProjectStatus, { label: string; variant: "neutral" | "brand" | "warning" | "success" }> = {
  planning: { label: "計画中", variant: "neutral" },
  active: { label: "進行中", variant: "brand" },
  at_risk: { label: "遅延リスク", variant: "warning" },
  done: { label: "完了", variant: "success" },
}

export type Project = {
  id: string
  name: string
  department: string
  owner: string
  status: ProjectStatus
  progress: number
  due: string
  budget: number
  openTasks: number
}

export const projects: Project[] = [
  { id: "PRJ-1042", name: "会員基盤のリニューアル", department: "プロダクト開発部", owner: "高橋 健太", status: "active", progress: 64, due: "2026/12/18", budget: 18_500_000, openTasks: 23 },
  { id: "PRJ-1041", name: "経費精算フローの自動化", department: "経営企画部", owner: "鈴木 葵", status: "at_risk", progress: 38, due: "2026/11/28", budget: 6_200_000, openTasks: 17 },
  { id: "PRJ-1039", name: "新卒オンボーディング改善", department: "人事部", owner: "田中 蓮", status: "active", progress: 81, due: "2026/11/15", budget: 2_400_000, openTasks: 6 },
  { id: "PRJ-1036", name: "問い合わせ窓口の一元化", department: "カスタマーサポート部", owner: "伊藤 陽菜", status: "planning", progress: 8, due: "2027/02/27", budget: 9_800_000, openTasks: 41 },
  { id: "PRJ-1033", name: "データ分析基盤の移行", department: "情報システム部", owner: "渡辺 悠真", status: "active", progress: 52, due: "2027/01/30", budget: 24_000_000, openTasks: 29 },
  { id: "PRJ-1030", name: "販売代理店ポータル構築", department: "営業推進部", owner: "山本 結衣", status: "at_risk", progress: 45, due: "2026/12/05", budget: 12_300_000, openTasks: 19 },
  { id: "PRJ-1027", name: "セキュリティ監査対応", department: "情報システム部", owner: "中村 湊", status: "done", progress: 100, due: "2026/10/10", budget: 3_600_000, openTasks: 0 },
  { id: "PRJ-1024", name: "社内ポータルの刷新", department: "総務部", owner: "小林 さくら", status: "done", progress: 100, due: "2026/09/30", budget: 4_100_000, openTasks: 0 },
  { id: "PRJ-1021", name: "請求書発行の電子化", department: "経理部", owner: "加藤 大翔", status: "active", progress: 72, due: "2026/11/20", budget: 5_500_000, openTasks: 9 },
  { id: "PRJ-1018", name: "在庫管理アプリの改修", department: "物流部", owner: "吉田 芽依", status: "planning", progress: 0, due: "2027/03/31", budget: 7_700_000, openTasks: 34 },
]

export const departments = [...new Set(projects.map((p) => p.department))]

export const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`

export const members = [
  { id: "u1", name: "佐藤 美咲", email: "misaki.sato@example.com", role: "owner", status: "active" as const, lastActive: "現在オンライン", department: "プロダクト開発部" },
  { id: "u2", name: "高橋 健太", email: "kenta.takahashi@example.com", role: "admin", status: "active" as const, lastActive: "10分前", department: "プロダクト開発部" },
  { id: "u3", name: "鈴木 葵", email: "aoi.suzuki@example.com", role: "member", status: "active" as const, lastActive: "2時間前", department: "経営企画部" },
  { id: "u4", name: "田中 蓮", email: "ren.tanaka@example.com", role: "member", status: "active" as const, lastActive: "昨日", department: "人事部" },
  { id: "u5", name: "伊藤 陽菜", email: "hina.ito@example.com", role: "member", status: "active" as const, lastActive: "3日前", department: "カスタマーサポート部" },
  { id: "u6", name: "渡辺 悠真", email: "yuma.watanabe@example.com", role: "admin", status: "active" as const, lastActive: "1時間前", department: "情報システム部" },
  { id: "u7", name: "山本 結衣", email: "yui.yamamoto@example.com", role: "member", status: "suspended" as const, lastActive: "2026/09/12", department: "営業推進部" },
  { id: "u8", name: "中村 湊", email: "minato.nakamura@example.com", role: "guest", status: "invited" as const, lastActive: undefined, department: "情報システム部" },
]

export const roles = [
  { value: "owner", label: "オーナー" },
  { value: "admin", label: "管理者" },
  { value: "member", label: "メンバー" },
  { value: "guest", label: "ゲスト" },
]

export const memberStatusLabels = { active: "有効", invited: "招待中", suspended: "停止中" }

export const tasks = [
  { id: "T-311", title: "会員データ移行スクリプトのレビュー", assignee: "高橋 健太", due: "11/02", priority: "高", done: false },
  { id: "T-308", title: "ログイン画面の文言確定", assignee: "鈴木 葵", due: "11/04", priority: "中", done: false },
  { id: "T-305", title: "旧システムの停止計画を作成", assignee: "渡辺 悠真", due: "11/08", priority: "高", done: false },
  { id: "T-301", title: "負荷試験の実施", assignee: "中村 湊", due: "11/12", priority: "中", done: false },
  { id: "T-296", title: "API仕様書の更新", assignee: "高橋 健太", due: "10/24", priority: "低", done: true },
]

export const activity = [
  { who: "高橋 健太", what: "「会員データ移行スクリプトのレビュー」を完了にしました", when: "10分前" },
  { who: "鈴木 葵", what: "「経費精算フローの自動化」の期限を11/28に変更しました", when: "1時間前" },
  { who: "渡辺 悠真", what: "「データ分析基盤の移行」にコメントしました", when: "3時間前" },
  { who: "田中 蓮", what: "「新卒オンボーディング改善」に資料を追加しました", when: "昨日" },
  { who: "佐藤 美咲", what: "中村 湊さんをワークスペースに招待しました", when: "昨日" },
]

export const weeks = ["9/1", "9/8", "9/15", "9/22", "9/29", "10/6", "10/13", "10/20"]
export const throughput = {
  completed: [42, 51, 47, 58, 63, 55, 71, 76],
  created: [55, 49, 60, 62, 58, 66, 69, 64],
}
export const workload = [
  { label: "開発", value: 128 },
  { label: "企画", value: 64 },
  { label: "人事", value: 41 },
  { label: "CS", value: 87 },
  { label: "情シス", value: 112 },
  { label: "営業", value: 59 },
]

export const notificationChannels = [
  { value: "email", label: "メール" },
  { value: "app", label: "アプリ内" },
  { value: "chat", label: "チャット連携" },
]

export const notificationGroups = [
  {
    title: "タスク",
    events: [
      { key: "assigned", label: "自分が担当者に設定されたとき" },
      { key: "due", label: "期限の前日", description: "毎朝9時にまとめて通知します。" },
      { key: "comment", label: "担当タスクにコメントがついたとき" },
    ],
  },
  {
    title: "プロジェクト",
    events: [
      { key: "status", label: "ステータスが変わったとき" },
      { key: "risk", label: "遅延リスクが検知されたとき", description: "進捗が予定より20%以上遅れた場合に通知します。" },
    ],
  },
  {
    title: "ワークスペース",
    events: [
      { key: "member", label: "メンバーが参加・退出したとき" },
      { key: "billing", label: "請求に関するお知らせ" },
    ],
  },
]

export const notificationValue: Record<string, string[]> = {
  assigned: ["email", "app"],
  due: ["app"],
  comment: ["app", "chat"],
  status: ["app"],
  risk: ["email", "app", "chat"],
  member: [],
  billing: ["email"],
}

export const invoices = [
  { id: "i6", date: "2026/10/01", number: "INV-2026-0010", amount: "¥99,000", status: "due" as const },
  { id: "i5", date: "2026/09/01", number: "INV-2026-0009", amount: "¥99,000", status: "paid" as const },
  { id: "i4", date: "2026/08/01", number: "INV-2026-0008", amount: "¥99,000", status: "paid" as const },
  { id: "i3", date: "2026/07/01", number: "INV-2026-0007", amount: "¥88,000", status: "paid" as const },
  { id: "i2", date: "2026/06/01", number: "INV-2026-0006", amount: "¥88,000", status: "failed" as const },
]

export const sessions = [
  { id: "s1", device: "ノートPC · ブラウザ", location: "東京, 日本", lastActive: "現在", current: true },
  { id: "s2", device: "スマートフォン · アプリ", location: "東京, 日本", lastActive: "2時間前", mobile: true },
  { id: "s3", device: "デスクトップPC · ブラウザ", location: "大阪, 日本", lastActive: "2026/10/18" },
]
