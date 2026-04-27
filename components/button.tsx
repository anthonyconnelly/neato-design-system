import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "../utils/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "xs" | "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200",
  secondary: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-gray-300 dark:hover:bg-neutral-900",
  ghost: "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-900",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  xs: "h-7 gap-1.5 px-2.5 text-xs",
  sm: "h-8 gap-1.5 px-3 text-sm",
  md: "h-10 gap-2 px-4 text-sm",
  lg: "h-11 gap-2 px-5 text-base",
};

const ICON_ONLY_CLASSES: Record<ButtonSize, string> = {
  xs: "h-7 w-7 px-0",
  sm: "h-8 w-8 px-0",
  md: "h-10 w-10 px-0",
  lg: "h-11 w-11 px-0",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconOnly?: boolean;
  loading?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  iconOnly = false,
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        iconOnly && ICON_ONLY_CLASSES[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : leftIcon}
      {iconOnly ? <span className="sr-only">{children}</span> : children}
      {!loading ? rightIcon : null}
    </button>
  );
}
