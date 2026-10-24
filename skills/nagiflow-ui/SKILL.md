---
name: nagiflow-ui
description: Build nagiflow product UI (Next.js) from @nagiflow/ui components and page blocks instead of designing from scratch. Use whenever creating or changing a landing page, pricing/product page, dashboard, list/detail/form page, account settings, login/signup, charts, or diagrams in a nagiflow project, or in any project that depends on @nagiflow/ui.
---

# nagiflow/ui

Rule zero: **don't design, assemble.** Every common page already has a proven layout in `@nagiflow/ui/blocks`. Start from the closest block or story, pass in real data and copy, and only then customize. Hand-made layouts, gradients, glass effects, emoji and "hero blobs" are what makes a UI look AI-generated. Don't produce them.

Source of truth: the package source (`node_modules/@nagiflow/ui/src`) and its stories (`src/stories/**`). Each story is a complete, copyable example page. Read the matching story before you build a page.

## Setup (once per app)

```css
/* app/globals.css */
@import "tailwindcss";
@import "@nagiflow/ui/styles.css";
```

- Dark mode: the `dark` class on `<html>` (next-themes `attribute="class"`).
- Product-specific brand: override the knobs, not individual colors: `:root { --brand-h: 160; --brand-c: 0.09; --brand-l: 0.4; }`. Light = 藍 Ai, dark = 墨 Sumi ink (dark knobs: `--dark-neutral-h/c`, `--dark-ring-h`).
- Fonts: set `--nf-font-sans` / `--nf-font-mono` from `next/font` variables.
- Wrap the app once in `app/layout.tsx` with `<NagiflowProvider locale="ja">` from `@nagiflow/ui/next`. Every block then uses next/link and highlights the current route automatically. Don't pass `linkAs={Link}` from a Server Component, because Next can't serialize functions across the client boundary.
- English UI strings: `<NagiflowProvider locale="en">`.

## Which block for which page

| Page | Start from (story) | Blocks |
|---|---|---|
| App frame | Dashboard/Pages/* | `AppShell`, `PageContainer` |
| Home / overview | Dashboard/Pages/Overview | `PageHeader`, `StatGrid`, `LineChart`, `BarChart`, `Sparkline` |
| List | Dashboard/Pages/Projects (+ Loading, Empty, NoResults, LoadError) | `PageHeader`, `FilterBar`, `DataTable` |
| Detail | Dashboard/Pages/Project detail | `PageHeader` (+ tabs), `DetailLayout`, `DescriptionList` |
| Create / edit form | Dashboard/Pages/New project | `FormSection`, `StickyFormActions`, `Field` |
| Settings | Settings/Pages/* | `SettingsLayout`, `ProfileSettings`, `MembersSettings`, `NotificationSettings`, `BillingSettings`, `SecuritySettings`, `DangerZone` |
| Auth | Auth/Pages/* | `AuthLayout`, `LoginForm`, `SignupForm`, `ForgotPasswordForm` |
| Landing page | Marketing/Pages/Landing (ja / en / mono display) | `SiteHeader`, `Hero`, `LogoCloud`, `FeatureGrid`, `FeatureSplit`, `PlatformSection`, `StatsBand`, `CaseStudies`, `Testimonial`, `CTABand`, `SiteFooter` |
| Pricing | Marketing/Pages/Pricing page | `PricingTable`, `PricingComparison`, `FAQ`, `CTABand` |
| Product / solution | Marketing/Pages/Product · Guard | `Hero`, `FeatureSplit`, `PlatformSection` |
| Visuals | Illustrations/* | `IsoStack`, `ProductFrame`, `FlowDiagram`, `DotField`, `IconTile`, `PlaceholderLogo` (from `@nagiflow/ui/illustrations`) |

Primitives (from `@nagiflow/ui`): Button, Badge, Card, Input, Textarea, Field, Label, Select / SelectField, Checkbox, RadioGroup, Switch, Dialog, ConfirmDialog, SheetContent, DropdownMenu, Tooltip, Avatar, Separator, Tabs, Accordion, Progress, Table, Alert, Skeleton, EmptyState, Breadcrumb, Pagination.

## Dashboard rules (non-negotiable)

1. **No one gets lost.** The sidebar marks the current page. The `PageHeader` title equals the nav label. Pages below the top level get a `breadcrumb`.
2. **One primary action per view**, set as `PageHeader.primaryAction` (top-right). Everything else goes in `secondaryActions` or a row `DropdownMenu`.
3. **Forms**: use `Field` for every input (label above, `required` shows a badge, `error` says what's wrong *and* how to fix it). Group long forms with `FormSection`, and put Save/Cancel in `StickyFormActions`.
4. **Tables**: `numeric` on number columns (right-aligned, tabular figures), `hideBelow` on low-priority columns, a status shown as a `Badge`, never color alone.
5. **Every async view has 4 states**: loading (`DataTable loading`/`Skeleton`), empty (`EmptyState` with one next action), no results (offer to clear filters), error (`Alert variant="destructive"` with a retry action).
6. **Destructive actions** always go through `ConfirmDialog`. The confirm label repeats the verb ("削除する"), and the description says exactly what is lost.
7. No decorative shadows, gradients or icons-for-decoration. Hierarchy comes from spacing and font weight.

## Marketing rules

1. Visuals are **drawn in code**: `ProductFrame` wrapping real dashboard blocks (a live "screenshot"), `IsoStack` for platform/architecture, `FlowDiagram` for integrations. Don't use stock photos or AI-generated hero art.
2. Section rhythm: eyebrow (mono, uppercase) → heading → lead → content. Alternate light bands with dark bands. A dark band is `className="dark bg-brand-surface text-brand-surface-foreground"`, and the `dark` class is required so controls inside invert.
3. Layout helpers: `Section`, `Container`, `SectionHeading`, `Eyebrow`, `ArrowLink`, `ActionButtons`. For the mono-display look, set `:root { --nf-font-display: var(--font-mono); }`.
4. Copy is specific and concrete: numbers, outcomes, the user's job. Avoid buzzword triplets.
5. Never name a real company or product in demo copy or logos. `LogoCloud` items must be fictional.

## Charts

Use `LineChart`/`BarChart`/`Sparkline`. Series colors come from `--chart-1..5` in fixed order. They are validated per palette for colorblind separation, so never invent chart colors. A chart with 2+ series always shows its legend, and a chart is never the only place a number appears.

## When the library is missing something

Don't wait and don't fork the theme. Build it in the app from the primitives, or copy the closest block's source from `node_modules/@nagiflow/ui/src/blocks/**` into the app and modify it. Note it so it can be upstreamed to nagiflow/ui later.
