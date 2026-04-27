import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "../utils/utils";
import { Button } from "./button";

type ModalSize = "sm" | "md" | "lg" | "xl";

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  className?: string;
};

const modalSizes: Record<ModalSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-3xl",
  xl: "sm:max-w-5xl",
};

export function Modal({ open, onOpenChange, title, description, children, footer, size = "md", className }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Dialog.Content className={cn("fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-900 shadow-xl outline-none transition-colors dark:border-neutral-800 dark:bg-neutral-950 dark:text-gray-100", modalSizes[size], className)}>
          <OverlayHeader title={title} description={description} />
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">{children}</div>
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
