import type { Meta, StoryObj } from "@storybook/react-vite"
import { IsoStack, ProductFrame, FlowDiagram, DotField, BrandMark, PlaceholderLogo, IconTile } from "../../illustrations/index.ts"
import { Cable, Layers, Workflow, ShieldCheck, Database, Users, BarChart3, Mail } from "lucide-react"
import { isoLayers, isoPipeline, isoPlatform, logos } from "../fixtures/marketing.ts"
import { InsightScreen, AuditScreen } from "../marketing/scenes.tsx"

const meta: Meta = { title: "Illustrations", parameters: { layout: "padded" } }
export default meta
type Story = StoryObj

const Stage = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border bg-muted/40 p-10">
    <DotField className="inset-0" />
    <div className="relative">{children}</div>
  </div>
)

export const IsoPlatform: Story = { name: "IsoStack · Platform", render: () => <Stage><IsoStack blocks={isoPlatform("ja")} /></Stage> }
export const IsoPipeline: Story = { name: "IsoStack · Pipeline", render: () => <Stage><IsoStack blocks={isoPipeline("ja")} /></Stage> }
export const IsoLayers: Story = { name: "IsoStack · Security layers", render: () => <Stage><div className="mx-auto max-w-2xl"><IsoStack blocks={isoLayers("ja")} /></div></Stage> }
export const IsoEnglish: Story = { name: "IsoStack · Platform (en)", render: () => <Stage><IsoStack blocks={isoPlatform("en")} /></Stage> }
export const IsoCustom: Story = {
  name: "IsoStack · Minimal API",
  render: () => (
    <Stage>
      <div className="mx-auto max-w-xl">
        <IsoStack
          blocks={[
            { x: 0, y: 0, w: 4, d: 4, h: 1, tone: "paper", label: "Storage", sublabel: "保存" },
            { x: 0, y: 0, z: 1.4, w: 4, d: 4, h: 1, tone: "brand", label: "Compute", sublabel: "処理", side: "left" },
            { x: 1, y: 1, z: 2.8, w: 2, d: 2, h: 2, tone: "ink", label: "App", sublabel: "アプリ" },
          ]}
        />
      </div>
    </Stage>
  ),
}

export const Frame: Story = {
  name: "ProductFrame · Dashboard",
  render: () => <div className="mx-auto max-w-5xl"><ProductFrame url="app.nagiflow.example/insight" label="ダッシュボード画面"><InsightScreen /></ProductFrame></div>,
}
export const FrameApp: Story = {
  name: "ProductFrame · App chrome",
  render: () => <div className="mx-auto max-w-3xl"><ProductFrame chrome="app" height={620}><AuditScreen /></ProductFrame></div>,
}
export const Flow: Story = {
  name: "FlowDiagram",
  render: () => (
    <div className="mx-auto max-w-4xl rounded-xl border bg-card p-8">
      <FlowDiagram
        title="データ連携の流れ"
        sources={[{ label: "会計システム", sublabel: "15分ごと", icon: Database }, { label: "人事システム", sublabel: "差分同期", icon: Users }, { label: "Webhook", sublabel: "リアルタイム", icon: Cable }]}
        hub={{ label: "Nagiflow Core", sublabel: "Unified data", icon: Layers }}
        targets={[{ label: "ダッシュボード", icon: BarChart3 }, { label: "ワークフロー", icon: Workflow }, { label: "メール配信", icon: Mail }]}
      />
    </div>
  ),
}
export const Marks: Story = {
  name: "Marks & logos",
  render: () => (
    <div className="grid gap-10">
      <div className="flex items-center gap-6"><BrandMark /><BrandMark showName={false} /></div>
      <div className="flex flex-wrap gap-8 text-foreground/70">{logos.map((l) => <PlaceholderLogo key={l.name} {...l} />)}</div>
      <div className="flex gap-3">
        <IconTile><Layers /></IconTile><IconTile tone="neutral"><Workflow /></IconTile><IconTile tone="inverse"><ShieldCheck /></IconTile>
      </div>
    </div>
  ),
}
