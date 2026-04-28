import type { SelectHTMLAttributes } from "react";
import { cn } from "../utils/utils";

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-gray-100 dark:focus:ring-gray-600",
        className,
      )}
      {...props}
    />
  );
}
