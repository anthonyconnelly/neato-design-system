import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SegmentedControlProps = {
  children: ReactNode;
  className?: string;
};

type SegmentedControlButtonProps = {
  active?: boolean;
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SegmentedControl({ children, className }: SegmentedControlProps) {
  return (
    <div className={cn("inline-flex flex-wrap items-center gap-1 rounded-full border border-gray-200 bg-gray-100 p-1 dark:border-[#2A2A2A] dark:bg-[#1C1C1C]", className)}>
      {children}
    </div>
  );
}

export function SegmentedControlButton({ active = false, className, children, ...props }: SegmentedControlButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm",
        active
          ? "bg-white text-gray-900 dark:bg-[#141414] dark:text-gray-100"
          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
