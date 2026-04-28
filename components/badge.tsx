import type { HTMLAttributes } from "react";
import { cn } from "../utils/utils";

type BadgeTone = "green" | "amber" | "red" | "gray" | "blue" | "purple" | "pink";

const TONE_CLASSES: Record<BadgeTone, string> = {
  green: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  amber: "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  red: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  gray: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  purple: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  pink: "bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
};

export function Badge({ tone = "gray", className, ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", TONE_CLASSES[tone], className)} {...props} />;
}
