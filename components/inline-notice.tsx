import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type InlineNoticeTone = "neutral" | "error" | "warning" | "info";

const TONE_CLASSES: Record<InlineNoticeTone, string> = {
  neutral: "border-gray-200 bg-white text-gray-600 dark:border-[#2A2A2A] dark:bg-[#141414] dark:text-gray-400",
  error: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300",
  warning: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-300",
  info: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/40 dark:bg-blue-900/20 dark:text-blue-300",
};

type InlineNoticeProps = {
  children: ReactNode;
  tone?: InlineNoticeTone;
  className?: string;
};

export function InlineNotice({ children, tone = "neutral", className }: InlineNoticeProps) {
  return <div className={cn("rounded-xl border p-4 text-sm", TONE_CLASSES[tone], className)}>{children}</div>;
}
