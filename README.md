# nagiflow/ui

A design system that ships **pages, not just components**. Tailwind CSS v4 + Radix UI, built for Next.js, Storybook-first.

- **Components**: install and import, and the nagiflow theme is already applied. No per-product setup.
- **Blocks**: production-ready Landing / Dashboard / Settings / Auth pages. Pass in your data and copy as props, then customize.
- **Illustrations**: isometric diagrams, flow diagrams and product frames drawn **in code** (SVG + theme tokens). They follow light/dark and the brand palette automatically. No stock images.

Storybook: https://nagiflow.github.io/ui/

## Install

```bash
bun add @nagiflow/ui        # or npm i / pnpm add
```

```css
/* app/globals.css */
@import "tailwindcss";
@import "@nagiflow/ui/styles.css";
```

```tsx
// app/layout.tsx: wires next/link + the current route into every block
import { NagiflowProvider } from "@nagiflow/ui/next"
<html lang="ja"><body><NagiflowProvider locale="ja">{children}</NagiflowProvider></body></html>
```

```tsx
// any page (Server Components are fine)
import { Button } from "@nagiflow/ui"
import { AppShell, PageHeader } from "@nagiflow/ui/blocks"
// import { IsoStack, ProductFrame } from "@nagiflow/ui/illustrations"

<AppShell /* brand, nav, user */>
  <PageHeader title="プロジェクト" primaryAction={<Button>新規プロジェクト</Button>} />
</AppShell>
```

- **Dark mode**: `<html class="dark">` (compatible with next-themes `attribute="class"`).
- **Brand**: nagiflow is 藍 (deep indigo) by day and 墨 (ink) by night. To rebrand one product, override the knobs, e.g. `:root { --brand-h: 160; --brand-c: 0.09; --brand-l: 0.4; }`; hover, ring, accent and the dark bands follow.
- **Fonts**: set `--nf-font-sans` / `--nf-font-mono` (for example from `next/font` variables). The defaults are Hanken Grotesk + Noto Sans JP, and Geist Mono.
- **Locale**: `<NagiflowProvider locale="en">` switches the built-in UI strings to English. Japanese is the default.
- **Other frameworks**: use `<LinkProvider Link={…} pathname={…}>` from `@nagiflow/ui` instead, or pass `linkAs` / `currentPath` per block from a Client Component.

## Principles

1. **No one gets lost.** The current location is always visible: active nav, breadcrumb, a page title that matches the nav label. The primary action is always top-right.
2. **Minimum cognitive load.** One primary action per view. Hierarchy comes from spacing and type, not decoration. Labels go above inputs. Numbers are right-aligned with tabular figures. Destructive actions always confirm with a verb-labeled button.
3. **The library never blocks a product.** If something is missing, build it in the app first. The full source ships in `src/`, so copy a block and change it. Bring the good parts back here later.

## AI usage

`skills/nagiflow-ui/SKILL.md` teaches coding agents to start from these blocks instead of designing pages from scratch. Install it globally with:

```bash
ln -s "$(pwd)/skills/nagiflow-ui" ~/.claude/skills/nagiflow-ui
```

## Develop

```bash
bun install
bun run dev              # Storybook on :6006
bun run typecheck
bun run build            # library → packages/ui/dist
bun run build-storybook  # static Storybook (deployed to GitHub Pages by CI)
```

The Storybook toolbar switches **Theme** (light = 藍 Ai / dark = 墨 Sumi) and **Locale** (ja/en).

## License

MIT
