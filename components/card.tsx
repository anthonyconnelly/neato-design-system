import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-xl border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#141414] p-4 shadow-sm transition-colors", className)} {...props} />;
}
