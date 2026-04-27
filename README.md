# Neato Design System

React + Tailwind primitives for Neato internal applications.

## Install

```bash
pnpm add @neato/ui
```

Until the package is published, install from the git URL for this repo.

Import the CSS once in your app entry:

```tsx
import "@neato/ui/styles/globals.css";
```

Wrap the app with the theme and toast providers:

```tsx
import { ThemeProvider, ToastProvider } from "@neato/ui";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
```

`styles/globals.css` loads TWK Lausanne from the package `fonts/` folder and defines the Tailwind v4 dark variant. Apps enable dark mode by applying `class="dark"` to a root element; `ThemeProvider` manages that class on `document.documentElement`.

## Imports

Top-level imports:

```tsx
import { Button, Modal, useToast } from "@neato/ui";
```

Tree-shaken path imports:

```tsx
import { Button } from "@neato/ui/button";
```

## Components

| Component | Purpose | File |
|-----------|---------|------|
| `Badge` | Status indicators | `components/badge.tsx` |
| `Button` | Actions with sizes, icon slots, loading state | `components/button.tsx` |
| `Card` | Content containers | `components/card.tsx` |
| `Checkbox` | Checkbox field | `components/checkbox.tsx` |
| `Combobox`, `MultiCombobox` | Async searchable selects | `components/combobox.tsx` |
| `Drawer` | Side panel overlay | `components/drawer.tsx` |
| `FieldChrome` | Shared field label/help/error wrapper | `components/field.tsx` |
| `FilterBar`, `FilterSearchInput` | Search and filter toolbar primitive | `components/filter-bar.tsx` |
| `InlineNotice` | Contextual notices and empty states | `components/inline-notice.tsx` |
| `Input` | Text-like inputs | `components/input.tsx` |
| `Modal` | Dialog overlay | `components/modal.tsx` |
| `PageHeader` | Page title + subtitle + actions slot | `components/page-header.tsx` |
| `PageShell` | Page layout wrapper | `components/page-shell.tsx` |
| `Radio`, `RadioGroup` | Radio fields | `components/radio.tsx` |
| `SegmentedControl` | Single-view mode toggles | `components/segmented-control.tsx` |
| `Select` | Native select input | `components/select.tsx` |
| `Skeleton` | Loading placeholders | `components/skeleton.tsx` |
| `Switch` | Boolean switch field | `components/switch.tsx` |
| `Table` | Simple table primitives and typed data table | `components/table.tsx` |
| `Tabs`, `Tab` | Keyboard-navigable content tabs | `components/tabs.tsx` |
| `Textarea` | Multiline text field | `components/textarea.tsx` |
| `ToastProvider`, `useToast` | Toast notifications | `providers/toast-provider.tsx` |

## Build

```bash
pnpm install
pnpm build
pnpm tsc --noEmit
```

The build produces ESM, CommonJS, and type declarations in `dist/`.
