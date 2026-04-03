import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "rounded-lg border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#141414] px-3 py-2 text-sm text-gray-900 dark:text-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600",
        className,
      )}
      {...props}
    />
  );
}
