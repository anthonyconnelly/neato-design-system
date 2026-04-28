import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "../utils/utils";
import type { SharedFieldProps } from "./field";

export function Radio({ label, helpText, error, className, ...props }: InputHTMLAttributes<HTMLInputElement> & SharedFieldProps) {
  return (
    <label className="flex items-start gap-2 text-sm text-gray-900 dark:text-gray-100">
      <input type="radio" className={cn("mt-0.5 h-4 w-4 accent-gray-900 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:accent-white dark:focus:ring-neutral-800", className)} {...props} />
      <span>
        {label ? <span className="block font-medium">{label}</span> : null}
        {error ? <span className="block text-xs text-red-600 dark:text-red-400">{error}</span> : null}
        {!error && helpText ? <span className="block text-xs text-gray-500 dark:text-gray-400">{helpText}</span> : null}
      </span>
    </label>
  );
}

export function RadioGroup({ label, helpText, error, children, className }: SharedFieldProps & { children: ReactNode; className?: string }) {
  return (
    <fieldset className={cn("space-y-2", className)}>
      {label ? <legend className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</legend> : null}
      <div className="space-y-2">{children}</div>
      {error ? <p className="text-xs text-red-600 dark:text-red-400">{error}</p> : null}
      {!error && helpText ? <p className="text-xs text-gray-500 dark:text-gray-400">{helpText}</p> : null}
    </fieldset>
  );
}
