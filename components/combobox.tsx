import { Check, Loader2, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type RefObject } from "react";

import { cn } from "../utils/utils";
import { fieldClasses } from "./field";

export type ComboboxOption = {
  id: string;
  label: string;
  detail?: string;
  disabled?: boolean;
};

type BaseComboboxProps = {
  loadOptions: (query: string) => Promise<ComboboxOption[]>;
  onQueryChange?: (query: string) => void;
  debounceMs?: number;
  placeholder?: string;
  ariaLabel: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
};

export type ComboboxProps = BaseComboboxProps & {
  value: string | null;
  onChange: (value: string | null) => void;
};

export type MultiComboboxProps = BaseComboboxProps & {
  value: string[];
  onChange: (value: string[]) => void;
};

export function Combobox({ value, onChange, loadOptions, onQueryChange, debounceMs = 250, placeholder, ariaLabel, emptyMessage, className, disabled }: ComboboxProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<ComboboxOption[]>([]);
  const [selected, setSelected] = useState<ComboboxOption | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const loadOptionsRef = useRef(loadOptions);

  useEffect(() => {
    loadOptionsRef.current = loadOptions;
  }, [loadOptions]);

  useEffect(() => {
    if (!value) {
      setSelected(null);
      if (!open) setQuery("");
      return;
    }
    const match = options.find((option) => option.id === value);
    if (match) {
      setSelected(match);
      if (!open) setQuery(match.label);
    }
  }, [open, options, value]);

  useEffect(() => loadOptionsForQuery({ open, disabled, debounceMs, query, setLoading, setOptions, setActiveIndex, loadOptions: loadOptionsRef.current }), [debounceMs, disabled, open, query]);
  useDismissOnOutsidePointer(rootRef, () => setOpen(false));

  function choose(option: ComboboxOption) {
    if (option.disabled) return;
    setSelected(option);
    setQuery(option.label);
    onChange(option.id);
    setOpen(false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp")) setOpen(true);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => nextActive(options, current, 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => nextActive(options, current, -1));
    }
    if (event.key === "Enter" && open && activeIndex >= 0) {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) choose(option);
    }
  }

  const activeId = activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined;

  return (
    <div ref={rootRef} className={cn("relative min-w-[220px]", className)}>
      <input
        role="combobox"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-controls={`${id}-listbox`}
        aria-activedescendant={activeId}
        autoComplete="off"
        disabled={disabled}
        placeholder={placeholder}
        value={open ? query : selected?.label ?? query}
        onFocus={() => {
          setOpen(true);
          if (selected) setQuery(selected.label);
        }}
        onChange={(event) => {
          const nextQuery = event.target.value;
          setQuery(nextQuery);
          onQueryChange?.(nextQuery);
          if (value) onChange(null);
        }}
        onKeyDown={onKeyDown}
        className={cn(fieldClasses, "pr-9")}
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear selection"
          className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-neutral-900 dark:hover:text-gray-100 dark:focus:ring-neutral-800"
          onClick={() => {
            setSelected(null);
            setQuery("");
            onChange(null);
            setOpen(true);
          }}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
      {open ? <OptionPanel id={`${id}-listbox`} options={options} activeIndex={activeIndex} selectedIds={value ? [value] : []} loading={loading} query={query} emptyMessage={emptyMessage} onChoose={choose} /> : null}
    </div>
  );
}

export function MultiCombobox({ value, onChange, loadOptions, onQueryChange, debounceMs = 250, placeholder, ariaLabel, emptyMessage, className, disabled }: MultiComboboxProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<ComboboxOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, ComboboxOption>>({});
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const selectedIds = useMemo(() => new Set(value), [value]);

  useEffect(() => {
    setSelectedOptions((current) => {
      const next = { ...current };
      for (const option of options) if (selectedIds.has(option.id)) next[option.id] = option;
      return next;
    });
  }, [options, selectedIds]);

  useEffect(() => loadOptionsForQuery({ open, disabled, debounceMs, query, setLoading, setOptions, setActiveIndex, loadOptions }), [debounceMs, disabled, loadOptions, open, query]);
  useDismissOnOutsidePointer(rootRef, () => setOpen(false));

  function choose(option: ComboboxOption) {
    if (option.disabled) return;
    const next = selectedIds.has(option.id) ? value.filter((idValue) => idValue !== option.id) : [...value, option.id];
    setSelectedOptions((current) => ({ ...current, [option.id]: option }));
    onChange(next);
    setQuery("");
    setOpen(true);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") setOpen(false);
    if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp")) setOpen(true);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => nextActive(options, current, 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => nextActive(options, current, -1));
    }
    if (event.key === "Enter" && open && activeIndex >= 0) {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) choose(option);
    }
  }

  const activeId = activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined;

  return (
    <div ref={rootRef} className={cn("relative min-w-[240px]", className)}>
      <div className={cn(fieldClasses, "flex min-h-10 flex-wrap items-center gap-1.5 py-1.5 pr-2")} onClick={() => setOpen(true)}>
        {value.map((idValue) => {
          const option = selectedOptions[idValue];
          return (
            <span key={idValue} className="inline-flex max-w-[180px] items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-neutral-900 dark:text-gray-200">
              <span className="truncate">{option?.label ?? idValue}</span>
              <button type="button" aria-label={`Remove ${option?.label ?? idValue}`} onClick={(event) => { event.stopPropagation(); onChange(value.filter((item) => item !== idValue)); }}>
                <X className="h-3 w-3" />
              </button>
            </span>
          );
        })}
        <input
          role="combobox"
          aria-label={ariaLabel}
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-activedescendant={activeId}
          autoComplete="off"
          disabled={disabled}
          placeholder={value.length ? "" : placeholder}
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            onQueryChange?.(event.target.value);
          }}
          onKeyDown={onKeyDown}
          className="min-w-[120px] flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed dark:placeholder:text-gray-400"
        />
      </div>
      {open ? <OptionPanel id={`${id}-listbox`} options={options} activeIndex={activeIndex} selectedIds={value} loading={loading} query={query} emptyMessage={emptyMessage} onChoose={choose} /> : null}
    </div>
  );
}

function OptionPanel({ id, options, activeIndex, selectedIds, loading, query, emptyMessage, onChoose }: { id: string; options: ComboboxOption[]; activeIndex: number; selectedIds: string[]; loading: boolean; query: string; emptyMessage?: string; onChoose: (option: ComboboxOption) => void }) {
  return (
    <div id={id} role="listbox" className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-neutral-800 dark:bg-neutral-950">
      {loading ? (
        <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
          <Loader2 className="h-4 w-4 animate-spin" />
          Searching...
        </div>
      ) : null}
      {!loading && options.length === 0 ? <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">{query ? emptyMessage ?? `No matches for "${query}"` : emptyMessage ?? "No matches"}</div> : null}
      {!loading
        ? options.map((option, index) => {
            const selected = selectedIds.includes(option.id);
            return (
              <button
                key={option.id}
                id={`${id}-option-${index}`}
                type="button"
                role="option"
                aria-selected={selected}
                disabled={option.disabled}
                className={cn("flex w-full items-start justify-between gap-2 px-3 py-2 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50", activeIndex === index ? "bg-gray-100 dark:bg-neutral-900" : "hover:bg-gray-50 dark:hover:bg-neutral-900")}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => onChoose(option)}
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium text-gray-900 dark:text-gray-100">{option.label}</span>
                  {option.detail ? <span className="block truncate text-xs text-gray-500 dark:text-gray-400">{option.detail}</span> : null}
                </span>
                {selected ? <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-300" /> : null}
              </button>
            );
          })
        : null}
    </div>
  );
}

function loadOptionsForQuery({
  open,
  disabled,
  debounceMs,
  query,
  loadOptions,
  setLoading,
  setOptions,
  setActiveIndex,
}: {
  open: boolean;
  disabled?: boolean;
  debounceMs: number;
  query: string;
  loadOptions: (query: string) => Promise<ComboboxOption[]>;
  setLoading: (value: boolean) => void;
  setOptions: (value: ComboboxOption[]) => void;
  setActiveIndex: (value: number) => void;
}) {
  if (!open || disabled) return undefined;
  let cancelled = false;
  const handle = window.setTimeout(() => {
    setLoading(true);
    loadOptions(query)
      .then((items) => {
        if (cancelled) return;
        setOptions(items);
        setActiveIndex(items.findIndex((item) => !item.disabled));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
  }, debounceMs);
  return () => {
    cancelled = true;
    window.clearTimeout(handle);
  };
}

function useDismissOnOutsidePointer(ref: RefObject<HTMLElement | null>, onDismiss: () => void) {
  useEffect(() => {
    function onDocumentMouseDown(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) onDismiss();
    }
    document.addEventListener("mousedown", onDocumentMouseDown);
    return () => document.removeEventListener("mousedown", onDocumentMouseDown);
  }, [onDismiss, ref]);
}

function nextActive(options: ComboboxOption[], current: number, direction: 1 | -1) {
  if (!options.length) return -1;
  let next = current;
  for (let index = 0; index < options.length; index += 1) {
    next = (next + direction + options.length) % options.length;
    if (!options[next]?.disabled) return next;
  }
  return -1;
}
