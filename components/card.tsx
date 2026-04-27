import type { HTMLAttributes } from "react";
import { cn } from "../utils/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors dark:border-neutral-800 dark:bg-neutral-950", className)} {...props} />;
}
