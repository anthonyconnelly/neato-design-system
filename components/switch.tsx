import type { InputHTMLAttributes } from "react";

import { cn } from "../utils/utils";
import type { SharedFieldProps } from "./field";

export function Switch({ label, helpText, error, className, ...props }: InputHTMLAttributes<HTMLInputElement> & SharedFieldProps) {
  return (
    <label className="flex items-start justify-between gap-3 text-sm text-gray-900 dark:text-gray-100">
      <span>
        {label ? <span className="block font-medium">{label}</span> : null}
        {error ? <span className="block text-xs text-red-600 dark:text-red-400">{error}</span> : null}
        {!error && helpText ? <span className="block text-xs text-gray-500 dark:text-gray-400">{helpText}</span> : null}
      </span>
      <span className="relative inline-flex shrink-0">
        <input type="checkbox" role="switch" className="peer sr-only" {...props} />
        <span
          className={cn(
            "h-5 w-9 rounded-full bg-gray-100 ring-1 ring-gray-200 transition-colors after:ml-0.5 after:mt-0.5 after:block after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:bg-gray-900 peer-checked:after:translate-x-4 peer-disabled:opacity-50 dark:bg-neutral-900 dark:ring-neutral-800 dark:peer-checked:bg-white dark:peer-checked:after:bg-gray-900",
            className,
          )}
        />
      </span>
    </label>
  );
}
