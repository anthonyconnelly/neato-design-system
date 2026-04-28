import type { ReactNode } from "react";

import { cn } from "../utils/utils";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  compact?: boolean;
};

export function PageShell({ children, className, containerClassName, compact = false }: PageShellProps) {
  return (
    <main className={cn("min-h-screen w-full bg-gray-50 transition-colors duration-200 dark:bg-neutral-950", className)}>
      <div
        className={cn(
          "mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10",
          compact ? "py-4 sm:py-5" : "py-6 sm:py-8",
          containerClassName,
        )}
      >
        {children}
      </div>
    </main>
  );
}
