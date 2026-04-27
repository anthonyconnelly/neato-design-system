import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "../utils/utils";
import { Button } from "./button";

type DrawerSide = "right" | "left";
type DrawerSize = "sm" | "md" | "lg" | "xl";

export type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  side?: DrawerSide;
  size?: DrawerSize;
  className?: string;
};

const drawerSizes: Record<DrawerSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-xl",
  lg: "sm:max-w-3xl",
  xl: "sm:max-w-5xl",
};

export function Drawer({ open, onOpenChange, title, description, children, footer, side = "right", size = "md", className }: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content
          className={cn(
            "fixed inset-y-0 z-50 flex w-full flex-col border-gray-200 bg-white text-gray-900 shadow-xl outline-none transition-colors dark:border-neutral-800 dark:bg-neutral-950 dark:text-gray-100 sm:w-[90vw]",
            side === "right" ? "right-0 border-l" : "left-0 border-r",
            drawerSizes[size],
            className,
          )}
        >
          <OverlayHeader title={title} description={description} />
          <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>
          {footer ? <div className="border-t border-gray-200 p-4 dark:border-neutral-800 sm:p-6">{footer}</div> : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function OverlayHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-gray-200 p-4 dark:border-neutral-800 sm:p-6">
      <div>
        <Dialog.Title className="text-base font-semibold text-gray-900 dark:text-gray-100">{title}</Dialog.Title>
        {description ? <Dialog.Description className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</Dialog.Description> : null}
      </div>
      <Dialog.Close asChild>
        <Button variant="ghost" size="sm" iconOnly leftIcon={<X className="h-4 w-4" />}>
          Close
        </Button>
      </Dialog.Close>
    </div>
  );
}
