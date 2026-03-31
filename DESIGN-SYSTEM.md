# Neato Money Design System

This document is the authoritative design system for Neato Money. Any PR that violates these standards will be rejected during code review.

## Design Philosophy

- Ramp-inspired: clean, data-forward, generous whitespace.
- Every screen answers one question: what does the user do next?
- Performance over decoration: fast, simple, no unnecessary visual weight.
- Consistency is non-negotiable: every page should feel like the same app.

## Typography

- Font: **TWK Lausanne** (Neato standard).
- `font-sans` is configured via Tailwind theme override and maps to TWK Lausanne.
- Font files live in `/public/fonts/` and are loaded in `src/app/globals.css`:
  - `TWKLausanne-350.woff2` (350 light)
  - `TWKLausanne-350Italic.woff2` (350 italic)
  - `TWKLausanne-450.woff2` (used as 400 regular)
  - `TWKLausanne-600.woff2` (600 semibold)
- Approved weights in UI: `350`, `400` (from the 450 file mapped as weight 400), `600`.
- Body text: `text-sm` (14px) for data, `text-base` (16px) for headings within sections.
- Page titles: `text-2xl font-semibold`.
- Section headers: `text-lg font-semibold`.
- Data labels: `text-xs font-medium uppercase tracking-wide text-gray-600`.
- Numbers/values: `text-sm text-gray-900` (use tabular numbers where possible).
- Do not introduce any other fonts.

## Color Palette

Use only the following colors already present in the app.

### Backgrounds

- Page: `bg-white` (`#ffffff`)
- Cards: `bg-gray-50` with `border-gray-200`
- Nav pills (inactive): `bg-gray-50`
- Nav pills (active): `bg-white` with `shadow-sm`
- Header: `bg-white/95` with `backdrop-blur-sm`

### Text

- Primary: `text-gray-900` (`#111827`)
- Secondary: `text-gray-600`
- Tertiary: `text-gray-500`
- Links/actions: `text-blue-600`
- Destructive: `text-red-600`

### Status Badges (`Badge` tones)

- `green`: `bg-green-100 text-green-800` (success, sent, paid)
- `amber`: `bg-amber-100 text-amber-800` (warning, pending, draft)
- `red`: `bg-red-100 text-red-800` (error, overdue, destructive)
- `gray`: `bg-gray-100 text-gray-700` (neutral, inactive)

### Buttons (`Button` variants)

- `primary`: `bg-blue-600 text-white hover:bg-blue-700`
- `secondary`: `bg-gray-900 text-white hover:bg-gray-800`
- `ghost`: `bg-transparent text-gray-700 hover:bg-gray-100`

### Borders

- Standard: `border-gray-200`
- Table rows: `border-gray-100`
- Inputs: `border-gray-300`, focus `focus:border-blue-600`

Do not introduce new colors. If a new color is genuinely needed, add a decision entry in `docs/DECISIONS.md` with rationale.

## Spacing And Layout

- Max content width: `max-w-[1440px]`
- Page padding: `px-6 lg:px-10`, `py-8`
- Card padding: `p-4`
- Table cell padding: `px-4 py-3`
- Component gap: `gap-4` for sections, `gap-2` for inline elements
- Border radius scale:
  - `rounded-xl` for cards/containers
  - `rounded-lg` for buttons/inputs
  - `rounded-full` for badges/nav pills

## Components (`src/components/ui/`)

Documented primitives and intended usage:

1. **Badge**
- Purpose: status indicators.
- Props: `tone` (`green | amber | red | gray`), plus native span props.
- Use for: order status, DAR status, bill stage.

2. **Button**
- Purpose: actions.
- Props: `variant` (`primary | secondary | ghost`), plus native button props.
- Use:
  - `primary` for main actions
  - `secondary` for alternate actions
  - `ghost` for destructive or low-emphasis actions

3. **Card**
- Purpose: content containers.
- Base style: `rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm`.
- Use for: summary cards, detail sections, form groups.

4. **Select**
- Purpose: dropdown inputs.
- Base style includes: `rounded-lg border border-gray-300 bg-white`, focus `border-blue-600`.
- Use for all select/dropdown controls.

5. **Table / TableContainer / Th / Td**
- Purpose: tabular data.
- `TableContainer`: rounded wrapper with border and horizontal overflow (`overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm`).
- `Th`: uppercase, tracked headers (`text-xs font-medium uppercase tracking-wide text-gray-600`).
- `Td`: consistent data-cell spacing and row separators (`border-b border-gray-100 px-4 py-3 text-sm text-gray-900`).

6. **Skeleton**
- Purpose: loading states.
- Base style: `animate-pulse rounded-md bg-gray-200`.
- Use Skeleton placeholders instead of spinners.

Do not create new UI primitives without adding them here first.

## Navigation

- Header uses pill-style nav: rounded-full pills inside a rounded-full container.
- Active nav state: `bg-white shadow-sm text-gray-900`.
- Inactive nav state: `text-gray-600 hover:text-gray-900`.
- Header container pattern: `border-b border-gray-200 bg-white/95 backdrop-blur-sm`.
- Logo treatment: Neato SVG + `money` in TWK Lausanne lowercase with zero gap.

## Data Display Patterns

- Currency: format with `$`, comma separators, and 2 decimal places.
- Percentages: one decimal place with `%` suffix.
- Dates: human-readable in UI (example: `Mar 29, 2026`), ISO in API responses.
- Negative values: standard minus sign; do not color negative values red unless it is an error state.
- Empty/null values: show an em dash (`—`), not `0` or blank.
- Loading states: use `Skeleton` components, not spinners.

## Responsive

- Desktop-first (internal tool, primarily used on laptops/desktops).
- Two-column grids collapse to single column on smaller screens (`md:grid-cols-2` pattern).
- Tables must use an `overflow-x-auto` wrapper for horizontal scrolling on small screens.

## What Is Not Allowed

- No dark mode.
- No custom fonts beyond TWK Lausanne.
- No CSS-in-JS (`styled-components`, `emotion`, etc.).
- No external component libraries (`shadcn`, MUI, Chakra, etc.); use `src/components/ui/` primitives.
- No animations beyond the existing Skeleton pulse.
- No gradients.
- No corner radii beyond `rounded-full`, `rounded-xl`, `rounded-lg`, `rounded-md`.
- No custom scrollbars.
- No decorative icons (functional icons only, when needed).

## PR Review Checklist (Design)

- [ ] Uses only existing UI components from `src/components/ui/`
- [ ] No new colors introduced without `docs/DECISIONS.md` entry
- [ ] No new fonts or font weights
- [ ] Follows spacing conventions (padding, gaps, max-width)
- [ ] Currency/date/number formatting matches existing patterns
- [ ] Loading states use Skeleton, not spinners
- [ ] Page structure follows existing layout (header -> summary cards -> detail sections)
