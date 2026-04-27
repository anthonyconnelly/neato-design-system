import { Search, X } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "../utils/utils";
import { Badge } from "./badge";
import { Button } from "./button";

export type FilterBarProps = {
  children?: ReactNode;
  search?: ReactNode;
  appliedCount?: number;
  onClear?: () => void;
  className?: string;
};

export function FilterBar({ children, search, appliedCount = 0, onClear, className }: FilterBarProps) {
  return (
    <div className={cn("flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-colors dark:border-neutral-800 dark:bg-neutral-950 sm:flex-row sm:items-center sm:justify-between", className)}>
      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        {search}
        {children}
      </div>
      <div className="flex items-center gap-2">
        {appliedCount > 0 ? <Badge tone="blue">{appliedCount} filters applied</Badge> : null}
        {onClear ? <Button variant="ghost" size="sm" leftIcon={<X className="h-4 w-4" />} onClick={onClear}>Clear all</Button> : null}
      </div>
    </div>
  );
}

export function FilterSearchInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="relative min-w-[220px] flex-1">
      <span className="sr-only">Search</span>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <input
        className={cn(
          "w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-500 focus:border-gray-300 focus:ring-2 focus:ring-gray-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:ring-neutral-800",
          className,
        )}
        {...props}
      />
    </label>
  );
}
