import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200",
  secondary: "border border-gray-200 dark:border-[#2A2A2A] bg-white dark:bg-[#141414] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1C1C1C]",
  ghost: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1C1C1C]",
};

export function Button({ variant = "primary", className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={cn("inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50", VARIANT_CLASSES[variant], className)} {...props} />;
}
