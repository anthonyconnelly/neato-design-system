# Neato Design System v2.0 — Foundation + Flow v2 Additions

## Goal

Take Base Camp's component conventions as the foundation (file naming, structure, CSS variables, dark mode pattern). Port the components Flow v2 added on top into the same style. Result: a single source of truth that both Base Camp and Flow v2 can adopt without further drift.

## Repos

- This repo (target): `~/code/neato-design-system`
- Base Camp (foundation): `~/code/base-camp/src/components/ui/`
- Flow v2 (source of additions): `~/code/flow-deploy/flow-frontend/src/ui-v2/`

## Baseline

Base Camp foundation already lives in `components/`:
- badge.tsx, button.tsx, card.tsx, inline-notice.tsx, page-header.tsx, page-shell.tsx, segmented-control.tsx, select.tsx, skeleton.tsx, table.tsx

Conventions to preserve:
- File naming: kebab-case (`page-header.tsx`, not `PageHeader.tsx`)
- Component naming: PascalCase exports
- Tailwind v4 with `@custom-variant dark (&:where(.dark, .dark *))` for dark mode
- TWK Lausanne via `@font-face` in `styles/globals.css`
- ThemeProvider in `providers/theme-provider.tsx`

## What to ADD (port from Flow v2 into Base Camp's conventions)

For each, port the Flow v2 implementation but rename to kebab-case file + match Base Camp's prop and styling conventions. Apps using v2 CSS vars (`--v2-surface`, `--v2-text-default`) — replace those with the design system's existing token approach (use Tailwind classes with `dark:` variants matching Base Camp's other components).

### 1. `components/combobox.tsx`
Source: `flow-deploy/flow-frontend/src/ui-v2/Combobox.tsx`. Includes both single Combobox and MultiCombobox. Async loading, keyboard navigation, search filter, empty state. Make the prop API consistent with the existing `select.tsx`.

### 2. `components/filter-bar.tsx`
Source: `flow-deploy/flow-frontend/src/ui-v2/FilterBar.tsx`. Includes search input + filter chip slots + applied-count badge + clear-all button. Pattern primitive — the component renders a slot and exposes hooks for the consumer to wire filter state.

### 3. `components/forms.tsx` — split into discrete files
Source: `flow-deploy/flow-frontend/src/ui-v2/Forms.tsx`. Split into one file per export, all kebab-case:
- `components/input.tsx` — text/number/email Input with label, helpText, error props
- `components/textarea.tsx` — same FieldChrome wrapper pattern
- `components/checkbox.tsx`
- `components/radio.tsx` (Radio + RadioGroup)
- `components/switch.tsx`
- `components/field.tsx` — the FieldChrome wrapper (label + error + help) used by all of the above

### 4. `components/modal.tsx` and `components/drawer.tsx`
Source: `flow-deploy/flow-frontend/src/ui-v2/Overlays.tsx`. Split into two files. Use Radix Dialog under the hood (already a Flow v2 dep — add to package.json deps). Modal sizes: sm/md/lg/xl. Drawer sides: right (default), left. Both support header/body/footer slots. Both support keyboard close (Esc) and backdrop click.

### 5. `components/tabs.tsx`
Source: `flow-deploy/flow-frontend/src/ui-v2/Tabs.tsx`. Real tabs with keyboard arrow navigation (left/right/Home/End). Different from existing `segmented-control.tsx` — keep both. Tabs is for navigation between content panels; SegmentedControl is for toggling a single view's mode.

### 6. `components/toast.tsx` + `providers/toast-provider.tsx`
Source: `flow-deploy/flow-frontend/src/ui-v2/Toast.tsx`. Provides `<ToastProvider>` and `useToast()` hook. Variants: default, success, error, warning. Auto-dismiss with configurable duration. Stack at top-right by default. Add to `providers/` alongside `theme-provider.tsx`.

## What to UPDATE (merge Flow v2 enhancements into existing files)

### `components/button.tsx`
Add from Flow v2's Button:
- `size` prop: `xs | sm | md | lg` (current default md)
- `leftIcon` and `rightIcon` slot props
- `iconOnly` boolean variant for square icon buttons
- `loading` boolean — shows spinner, disables button, preserves layout

Keep existing variants. Do not remove anything.

### `components/badge.tsx`
Add `tone` values present in Flow v2's `Status.tsx` that Base Camp lacks: `blue`, `purple`, `pink`. Keep all existing tones (green, amber, red, gray).

### `components/table.tsx`
Add from Flow v2's Table:
- `TableColumn<T>` generic type for type-safe column configs
- Sticky column support via column.locked: 'left' | 'right'
- Column width prop (`width: string`)
- Generic `cell: (row: T) => ReactNode` rather than only string keys
- Hover and selected row styling

Keep existing simple usage working — make new features additive.

## What to ADD at the package level

### `package.json`
- Set `"name": "@neato/ui"`
- Set `"version": "2.0.0"`
- Set `"main"` and `"module"` and `"types"` for ESM + types
- Add proper `"exports"` map so consumers can `import { Button } from '@neato/ui'` for top-level OR `import { Button } from '@neato/ui/button'` for tree-shaken paths
- Add `"sideEffects": false` for tree shaking
- Move runtime deps to `dependencies`: react, react-dom (peer), @radix-ui/react-dialog, @radix-ui/react-tabs, lucide-react, clsx
- Add build scripts using `tsup` or `vite build --lib` — produce dist/ with .js, .mjs, .d.ts
- Set `"files": ["dist", "fonts", "styles", "README.md"]` for npm publish

### `src/index.ts` (top-level barrel)
Export everything from components, providers, utils. Named exports only — no default exports.

### `styles/globals.css`
Document and consolidate the dark mode pattern. Pick ONE approach and enforce it:
- Tailwind v4 `@custom-variant dark (&:where(.dark, .dark *))` is canonical
- Apps must apply `class="dark"` on a root element to enable dark mode
- Components must use `dark:` Tailwind utilities, NEVER inline hex
- Document forbidden patterns (no `dark:bg-[#141414]`)

### `DESIGN-SYSTEM.md`
Update the components table to include all new components. Add usage examples for each new component. Add a "Migration Guide" section explaining how to replace `dark:bg-[#141414]` style hardcodes with token classes.

### `README.md`
Update install instructions:
- `pnpm add @neato/ui` (or git URL until published)
- Import the CSS once: `import '@neato/ui/styles/globals.css'`
- Wrap app in `<ThemeProvider>` and `<ToastProvider>`
- Apply TWK Lausanne by importing the font CSS

## What NOT to do

- Do not break Base Camp's existing component APIs. New props only.
- Do not delete `segmented-control.tsx`. Keep it alongside the new `tabs.tsx`.
- Do not introduce CSS-in-JS, styled-components, emotion, or stitches. Tailwind only.
- Do not introduce a state management library. Components stay stateless or use React's built-ins.
- Do not bump React to v19 if package.json currently targets v18 — match Base Camp's React version.

## Verification

Before opening the PR, run from the repo root:
- `pnpm install`
- `pnpm build` — produces `dist/` cleanly with no type errors
- `pnpm tsc --noEmit` — passes
- Visually inspect that the new component files exist with the expected exports
- `git status` shows only intended changes

## Branch & PR

- Branch: `feature/v2-foundation-plus-flow-additions`
- PR base: `main` (verify default branch first; could be `master`)
- PR title: `v2.0: Add Flow v2 components on Base Camp foundation`
- Body: bullet list of what was added + what was updated, link to this task file
- Open PR. Do NOT auto-merge.

## Out of scope

- Migrating Base Camp / Flow v2 / Neato Money apps to consume the new package. That's a separate task.
- Publishing to npm. AC handles that after review.
- Storybook or visual docs site.
