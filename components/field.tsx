import type { ReactNode } from "react";

export type FieldChromeProps = {
  label?: string;
  helpText?: string;
  error?: string;
  children: ReactNode;
};

export function FieldChrome({ label, helpText, error, children }: FieldChromeProps) {
  return (
    <label className="block space-y-1.5">
      {label ? <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">{label}</span> : null}
      {children}
      {error ? <span className="block text-xs text-red-600 dark:text-red-400">{error}</span> : null}
      {!error && helpText ? <span className="block text-xs text-gray-500 dark:text-gray-400">{helpText}</span> : null}
    </label>
  );
}

export type SharedFieldProps = {
  label?: string;
  helpText?: string;
  error?: string;
};

export const fieldClasses =
  "w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-500 focus:border-gray-300 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-neutral-700 dark:focus:ring-neutral-800";

export const fieldErrorClasses = "border-red-500 focus:border-red-500 focus:ring-red-500/15 dark:border-red-500";
