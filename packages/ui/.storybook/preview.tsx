import type { Preview, Decorator } from "@storybook/react-vite"
import { LocaleProvider, type Locale } from "../src/lib/locale.tsx"
import "@fontsource-variable/hanken-grotesk"
import "@fontsource-variable/noto-sans-jp"
import "@fontsource-variable/geist-mono"
import "./storybook.css"

const withTheme: Decorator = (Story, { globals }) => {
  const html = document.documentElement
  html.classList.toggle("dark", globals.theme === "dark")
  html.lang = globals.locale
  return (
    <LocaleProvider locale={globals.locale as Locale}>
      <Story />
    </LocaleProvider>
  )
}

const preview: Preview = {
  decorators: [withTheme],
  initialGlobals: { theme: "light", locale: "ja" },
  globalTypes: {
    theme: {
      description: "Color scheme",
      toolbar: { title: "Theme", icon: "mirror", dynamicTitle: true, items: [{ value: "light", title: "Light" }, { value: "dark", title: "Dark" }] },
    },
    locale: {
      description: "Built-in UI strings",
      toolbar: { title: "Locale", icon: "globe", dynamicTitle: true, items: [{ value: "ja", title: "日本語" }, { value: "en", title: "English" }] },
    },
  },
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    a11y: { test: "todo" },
    options: { storySort: { order: ["Introduction", "Foundations", "Components", "Illustrations", "Dashboard", "Settings", "Auth", "Marketing"] } },
  },
}
export default preview
