import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { cn } from "../utils/utils";
import { Button } from "../components/button";

export type ToastVariant = "default" | "success" | "error" | "warning";
export type ToastInput = { title: string; description?: string; variant?: ToastVariant; duration?: number };
type ToastRecord = ToastInput & { id: number; variant: ToastVariant; duration: number };

const ToastContext = createContext<{ toast: (input: ToastInput) => number; dismiss: (id: number) => void } | null>(null);

const variantClasses: Record<ToastVariant, string> = {
  default: "border-blue-200 dark:border-blue-900/40",
  success: "border-green-200 dark:border-green-900/40",
  error: "border-red-200 dark:border-red-900/40",
  warning: "border-amber-200 dark:border-amber-900/40",
};

const icons: Record<ToastVariant, ReactNode> = {
  default: <Info className="h-4 w-4 text-blue-600 dark:text-blue-300" />,
  success: <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-300" />,
  error: <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-300" />,
  warning: <TriangleAlert className="h-4 w-4 text-amber-600 dark:text-amber-300" />,
};

export function ToastProvider({ children, duration = 5000 }: { children: ReactNode; duration?: number }) {
  const [items, setItems] = useState<ToastRecord[]>([]);

  const dismiss = useCallback((id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback(
    (input: ToastInput) => {
      const id = Date.now() + Math.random();
      const item = { ...input, id, variant: input.variant ?? "default", duration: input.duration ?? duration };
      setItems((current) => [...current, item]);
      window.setTimeout(() => dismiss(id), item.duration);
      return id;
    },
    [dismiss, duration],
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[70] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2">
        {items.map((item) => (
          <div key={item.id} className={cn("flex gap-3 rounded-lg border bg-white p-3 text-gray-900 shadow-lg dark:bg-neutral-950 dark:text-gray-100", variantClasses[item.variant])}>
            <div className="mt-0.5">{icons[item.variant]}</div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{item.title}</p>
              {item.description ? <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.description}</p> : null}
            </div>
            <Button variant="ghost" size="sm" iconOnly leftIcon={<X className="h-4 w-4" />} onClick={() => dismiss(item.id)}>
              Dismiss
            </Button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context.toast;
}
