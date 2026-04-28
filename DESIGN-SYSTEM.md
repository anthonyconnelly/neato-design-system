# Neato Design System

This is the authoritative UI spec for Neato applications using `@neato/ui`.

## Foundations

- React components only. No CSS-in-JS.
- Tailwind v4 utilities are canonical.
- TWK Lausanne is the only UI font.
- Dark mode is class based with `@custom-variant dark (&:where(.dark, .dark *))`.
- Apps enable dark mode by applying `class="dark"` to a root element.
- Components use `dark:` Tailwind utilities. Do not use inline dark hex utilities such as `dark:bg-[#141414]`.

## Components

| Component | Purpose |
|-----------|---------|
| `Badge` | Status indicators with `green`, `amber`, `red`, `gray`, `blue`, `purple`, `pink` tones. |
| `Button` | Actions with `variant`, `size`, `leftIcon`, `rightIcon`, `iconOnly`, and `loading`. |
| `Card` | Bordered content container. |
| `Checkbox` | Checkbox field with label, help text, and error text. |
| `Combobox`, `MultiCombobox` | Async searchable single and multi selects. |
| `Drawer` | Left or right Radix Dialog side panel. |
| `FieldChrome` | Shared label/help/error wrapper for form controls. |
| `FilterBar`, `FilterSearchInput` | Search, filter slots, applied count, and clear-all action. |
| `InlineNotice` | Contextual notices and empty states. |
| `Input` | Text, number, email, and other native input types. |
| `Modal` | Radix Dialog modal with header, body, and footer slots. |
| `PageHeader` | Page title, description, actions, and optional back link. |
| `PageShell` | Page background and constrained content width. |
| `Radio`, `RadioGroup` | Radio inputs and grouped field wrapper. |
| `SegmentedControl` | Toggle between modes in one view. Keep separate from `Tabs`. |
| `Select` | Native select input. |
| `Skeleton` | Loading placeholder. |
| `Switch` | Boolean switch field. |
| `Table` | Simple table primitives and typed column-driven data table. |
| `Tabs`, `Tab` | Content navigation tabs with Arrow, Home, and End keyboard movement. |
| `Textarea` | Multiline text field. |
| `ToastProvider`, `useToast` | Stacked toast notifications. |

## Usage

```tsx
import { Button, Input, Modal, ToastProvider, useToast } from "@neato/ui";
import "@neato/ui/styles/globals.css";
```

### Button

```tsx
<Button variant="primary" size="md" loading={saving}>
  Save changes
</Button>
```

### Forms

```tsx
<Input label="Email" type="email" helpText="Used for receipts." />
<Textarea label="Notes" />
<Checkbox label="Send copy" />
<RadioGroup label="Status">
  <Radio name="status" value="active" label="Active" />
  <Radio name="status" value="inactive" label="Inactive" />
</RadioGroup>
<Switch label="Enabled" checked={enabled} onChange={(event) => setEnabled(event.currentTarget.checked)} />
```

### Combobox

```tsx
<Combobox
  value={brandId}
  onChange={setBrandId}
  ariaLabel="Brand"
  placeholder="Search brands"
  loadOptions={(query) => searchBrands(query)}
/>
```

### Filter Bar

```tsx
<FilterBar
  search={<FilterSearchInput value={query} onChange={(event) => setQuery(event.currentTarget.value)} />}
  appliedCount={appliedCount}
  onClear={clearFilters}
>
  <Select value={status} onChange={(event) => setStatus(event.currentTarget.value)} />
</FilterBar>
```

### Modal And Drawer

```tsx
<Modal open={open} onOpenChange={setOpen} title="Edit customer" footer={<Button>Save</Button>}>
  <Input label="Name" />
</Modal>

<Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Filters" side="right">
  <Switch label="Show archived" />
</Drawer>
```

### Tabs

```tsx
<Tabs aria-label="Billing views">
  <Tab active={view === "open"} onClick={() => setView("open")}>Open</Tab>
  <Tab active={view === "paid"} onClick={() => setView("paid")}>Paid</Tab>
</Tabs>
```

### Toasts

```tsx
function SaveButton() {
  const toast = useToast();
  return <Button onClick={() => toast({ title: "Saved", variant: "success" })}>Save</Button>;
}

<ToastProvider>{children}</ToastProvider>
```

### Table

```tsx
type Row = { id: string; name: string; amount: number };

const columns: Array<TableColumn<Row>> = [
  { key: "name", header: "Name", accessor: "name", locked: "left", width: "240px" },
  { key: "amount", header: "Amount", cell: (row) => `$${row.amount.toFixed(2)}`, align: "right" },
];

<Table columns={columns} rows={rows} rowKey="id" selectedRowKey={selectedId} onRowClick={setSelectedRow} />
```

## Migration Guide

Replace Flow v2 token classes and hardcoded dark hex utilities with design-system Tailwind utilities:

| Old pattern | New pattern |
|-------------|-------------|
| `bg-[var(--v2-surface)]` | `bg-white dark:bg-neutral-950` |
| `text-[var(--v2-text-default)]` | `text-gray-900 dark:text-gray-100` |
| `dark:bg-[#141414]` | `dark:bg-neutral-950` |
| `dark:bg-[#1C1C1C]` | `dark:bg-neutral-900` |
| `dark:border-[#2A2A2A]` | `dark:border-neutral-800` |

Do not introduce new CSS variables for component color unless the design system adds them first. Prefer stable Tailwind classes with a light utility and matching `dark:` utility.
