# Neato Design System

The official design system for all Neato internal applications. This repo contains the UI components, fonts, styles, and documentation that ensure every Neato app looks and feels consistent.

## What's Inside

```
components/     → React + Tailwind UI primitives (Badge, Button, Card, Select, Skeleton, Table)
fonts/          → TWK Lausanne font files (.woff2)
styles/         → CSS with @font-face declarations and theme config
utils/          → Shared utility functions (cn, formatCurrency, formatDate)
templates/      → Starter files for new projects (layout, globals.css, tailwind.config)
DESIGN-SYSTEM.md → The authoritative design spec (give this to your AI coding agent)
```

## Quick Start

### 1. Copy into your project

```bash
# Clone the design system
git clone https://github.com/anthonyconnelly/neato-design-system.git /tmp/nds

# Copy components into your Next.js project
cp -r /tmp/nds/components/* your-project/src/components/ui/
cp -r /tmp/nds/fonts/* your-project/public/fonts/
cp /tmp/nds/utils/utils.ts your-project/src/lib/utils.ts
cp /tmp/nds/styles/globals.css your-project/src/app/globals.css
cp /tmp/nds/templates/tailwind.config.ts your-project/tailwind.config.ts
```

### 2. Set up your AI coding agent

Copy `DESIGN-SYSTEM.md` into your project root so Claude Code / Codex reads it automatically:

```bash
cp /tmp/nds/DESIGN-SYSTEM.md your-project/DESIGN-SYSTEM.md
```

Or add it to your `AGENTS.md` / `CLAUDE.md`:

```markdown
## Design System
Read and follow DESIGN-SYSTEM.md for all UI work. Do not deviate from the component library, color palette, or typography defined there.
```

### 3. Install dependencies

The design system uses only:
- **React** (18+)
- **Tailwind CSS** (v4)
- **Next.js** (15+) — for `next/image` and `next/link` in templates

No external component libraries. No CSS-in-JS. No shadcn, MUI, Chakra, or Radix.

## For AI Coding Agents

**The most important file is `DESIGN-SYSTEM.md`.** This is the spec that AI agents should read before writing any UI code. It contains:

- Exact color values and when to use each
- Typography scale and font weights
- Component API documentation with props and variants
- Spacing and layout conventions
- Data display patterns (currency, dates, empty states)
- Explicit list of what's NOT allowed
- PR review checklist

When giving a task to Claude Code or Codex, include:
```
Follow the design system in DESIGN-SYSTEM.md. Use only the components in src/components/ui/. Do not introduce new colors, fonts, or component libraries.
```

## Components

| Component | Purpose | File |
|-----------|---------|------|
| `Badge` | Status indicators (green/amber/red/gray) | `components/badge.tsx` |
| `Button` | Actions (primary/secondary/ghost) | `components/button.tsx` |
| `Card` | Content containers | `components/card.tsx` |
| `InlineNotice` | Contextual notices, empty states, banners | `components/inline-notice.tsx` |
| `PageHeader` | Page title + subtitle + actions slot | `components/page-header.tsx` |
| `PageShell` | Page layout wrapper (max-width, padding, bg) | `components/page-shell.tsx` |
| `SegmentedControl` | Tab-style filter/toggle controls | `components/segmented-control.tsx` |
| `Select` | Dropdown inputs | `components/select.tsx` |
| `Skeleton` | Loading states (pulse animation) | `components/skeleton.tsx` |
| `Table` | Tabular data (TableContainer, Table, Th, Td) | `components/table.tsx` |

## Updating

When the design system evolves:

1. Update components and docs in this repo
2. Tag a new version: `git tag v1.1.0`
3. Teams pull updates: `cd /tmp/nds && git pull`
4. Copy changed files into projects
5. (Future) Publish as `@neato/ui` npm package for proper dependency management

## Roadmap

- [ ] **v1.0** — Shared repo (current)
- [ ] **v2.0** — Private npm package (`@neato/ui`) with proper imports
- [ ] Input component (text fields)
- [ ] Modal/Dialog component
- [ ] Toast/notification component
- [ ] Dark mode (if ever needed)

## Dark Mode

Full dark mode support included. See `DESIGN-SYSTEM.md` for implementation details.

### Quick Start

1. Use `styles/globals.css` (includes `@custom-variant dark` and CSS variables)
2. Add `providers/theme-provider.tsx` to your project
3. Wrap your app in `<ThemeProvider>` (see `templates/layout.tsx`)
4. All components include `dark:` variants automatically
