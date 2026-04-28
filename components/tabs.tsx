import { Children, cloneElement, isValidElement, type ButtonHTMLAttributes, type HTMLAttributes, type KeyboardEvent, type ReactElement } from "react";

import { cn } from "../utils/utils";

export function Tabs({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }>[];

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'));
    const currentIndex = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const fallbackIndex = buttons.findIndex((button) => button.getAttribute("aria-selected") === "true");
    const index = currentIndex >= 0 ? currentIndex : fallbackIndex;
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? buttons.length - 1 : event.key === "ArrowRight" ? (index + 1) % buttons.length : (index - 1 + buttons.length) % buttons.length;
    buttons[nextIndex]?.focus();
  }

  return (
    <div role="tablist" onKeyDown={onKeyDown} className={cn("flex items-center gap-1 overflow-x-auto rounded-full border border-gray-200 bg-gray-100 p-1 dark:border-neutral-800 dark:bg-neutral-900", className)} {...props}>
      {items.map((child) => cloneElement(child, { role: "tab" }))}
    </div>
  );
}

export function Tab({ active = false, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      aria-selected={active}
      className={cn("whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium outline-none transition-colors sm:px-4 sm:text-sm", active ? "bg-white text-gray-900 shadow-sm dark:bg-neutral-950 dark:text-gray-100" : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200", className)}
      {...props}
    />
  );
}
