import type { HTMLAttributes } from "react";
import { cn } from "../utils/utils";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-gray-200 dark:bg-neutral-800", className)} {...props} />;
}
