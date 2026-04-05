import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
  backLink?: {
    href: string;
    label: string;
  };
};

export function PageHeader({ title, description, actions, className, backLink }: PageHeaderProps) {
  return (
    <header className={cn("flex flex-wrap items-start justify-between gap-3", className)}>
      <div className="space-y-1">
        {backLink ? (
          <Link href={backLink.href} className="inline-flex items-center text-sm text-blue-600 hover:underline dark:text-blue-400">
            {backLink.label}
          </Link>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">{title}</h1>
        <p className="max-w-3xl text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  );
}
