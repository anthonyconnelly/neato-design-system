import { Check } from "lucide-react";
import type { InputHTMLAttributes } from "react";

import { cn } from "../utils/utils";
import type { SharedFieldProps } from "./field";

export function Checkbox({ label, helpText, error, className, ...props }: InputHTMLAttributes<HTMLInputElement> & SharedFieldProps) {
  return (
    <label className="flex items-start gap-2 text-sm text-gray-900 dark:text-gray-100">
      <span className="relative mt-0.5 inline-flex h-4 w-4 shrink-0">
        <input
          type="checkbox"
          className={cn(
            "peer h-4 w-4 appearance-none rounded border border-gray-200 bg-white checked:border-gray-900 checked:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:checked:border-white dark:checked:bg-white dark:focus:ring-neutral-800",
            className,
          )}
          {...props}
        />
        <Check className="pointer-events-none absolute inset-0 hidden h-4 w-4 p-0.5 text-white peer-checked:block dark:text-gray-900" aria-hidden="true" />
      </span>
      <span>
        {label ? <span className="block font-medium">{label}</span> : null}
        {error ? <span className="block text-xs text-red-600 dark:text-red-400">{error}</span> : null}
        {!error && helpText ? <span className="block text-xs text-gray-500 dark:text-gray-400">{helpText}</span> : null}
      </span>
    </label>
  );
}
