import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import type { HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

import { cn } from "../utils/utils";
import { Button } from "./button";
import { InlineNotice } from "./inline-notice";
import { Skeleton } from "./skeleton";

export type SortDirection = "asc" | "desc";

export type TableColumn<T> = {
  key: string;
  header: ReactNode;
  accessor?: keyof T | ((row: T) => ReactNode);
  cell?: (row: T) => ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  locked?: "left" | "right" | boolean;
  width?: string;
};

export function TableContainer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm transition-colors dark:border-neutral-800 dark:bg-neutral-950", className)} {...props} />;
}

type TableProps<T> = TableHTMLAttributes<HTMLTableElement> & {
  columns?: Array<TableColumn<T>>;
  rows?: T[];
  rowKey?: keyof T | ((row: T) => string | number);
  loading?: boolean;
  dense?: boolean;
  selectedRowKey?: string | number | null;
  onRowClick?: (row: T) => void;
  sort?: { key: string; direction: SortDirection } | null;
  onSortChange?: (sort: { key: string; direction: SortDirection }) => void;
  onSortClear?: () => void;
  pagination?: ReactNode;
  emptyState?: ReactNode;
  skeletonRows?: number;
};

export function Table<T>({
  columns,
  rows,
  rowKey,
  loading = false,
  dense = false,
  selectedRowKey,
  onRowClick,
  sort,
  onSortChange,
  onSortClear,
  pagination,
  emptyState,
  skeletonRows = 8,
  className,
  children,
  ...props
}: TableProps<T>) {
  if (!columns || !rows || !rowKey) {
    return (
      <table className={cn("min-w-full divide-y divide-gray-200 text-sm dark:divide-neutral-800", className)} {...props}>
        {children}
      </table>
    );
  }

  const getRowKey = (row: T) => (typeof rowKey === "function" ? rowKey(row) : (row[rowKey] as string | number));

  return (
    <div className={cn("overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-colors dark:border-neutral-800 dark:bg-neutral-950", className)}>
      <div className="max-h-[70vh] overflow-auto">
        <table className="min-w-full border-collapse text-sm" {...props}>
          <thead className="sticky top-0 z-20 bg-gray-50 dark:bg-neutral-900">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className={cn(
                    "border-b border-gray-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 transition-colors dark:border-neutral-800 dark:text-gray-400",
                    alignClass(column.align),
                    lockedClass(column.locked, "header"),
                    dense && "py-2",
                  )}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1"
                      onClick={() => {
                        const next = nextSort(sort, column.key);
                        if (next) onSortChange?.(next);
                        else onSortClear?.();
                      }}
                    >
                      {column.header}
                      {sort?.key === column.key ? sort.direction === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" /> : <ChevronsUpDown className="h-3 w-3" />}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-gray-100 last:border-b-0 dark:border-neutral-800">
                    {columns.map((column) => (
                      <td key={column.key} className={cn("px-4", dense ? "py-2" : "py-3", lockedClass(column.locked, "cell"))}>
                        <Skeleton className="h-4 w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              : rows.map((row) => {
                  const key = getRowKey(row);
                  const selected = selectedRowKey === key;
                  return (
                    <tr
                      key={key}
                      onClick={() => onRowClick?.(row)}
                      className={cn(
                        "group border-b border-gray-100 transition-colors last:border-b-0 hover:bg-gray-50 dark:border-neutral-800 dark:hover:bg-neutral-900",
                        onRowClick && "cursor-pointer",
                        selected && "bg-blue-50 dark:bg-blue-950/40",
                      )}
                    >
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className={cn(
                            "px-4 text-gray-900 transition-colors dark:text-gray-100",
                            dense ? "py-2" : "py-3",
                            alignClass(column.align),
                            lockedClass(column.locked, "cell"),
                            column.locked && "group-hover:bg-gray-50 dark:group-hover:bg-neutral-900",
                            column.locked && selected && "bg-blue-50 dark:bg-blue-950/40",
                          )}
                        >
                          {renderCell(row, column)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
          </tbody>
        </table>
        {!loading && rows.length === 0 ? <div className="p-4">{emptyState ?? <InlineNotice>No results found.</InlineNotice>}</div> : null}
      </div>
      {pagination ? <div className="flex items-center justify-end border-t border-gray-200 p-3 transition-colors dark:border-neutral-800">{pagination}</div> : null}
    </div>
  );
}

export function Th({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn("px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400", className)} {...props} />;
}

export function Td({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-4 py-3 text-gray-900 dark:text-gray-100", className)} {...props} />;
}

export function Tr({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("border-b border-gray-100 transition-colors hover:bg-gray-50 dark:border-neutral-800 dark:hover:bg-neutral-900", className)} {...props} />;
}

export function Pagination({ page, pageCount, onPrevious, onNext }: { page: number; pageCount: number; onPrevious: () => void; onNext: () => void }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <span>
        Page {page} of {pageCount}
      </span>
      <Button variant="secondary" size="sm" onClick={onPrevious} disabled={page <= 1}>
        Previous
      </Button>
      <Button variant="secondary" size="sm" onClick={onNext} disabled={page >= pageCount}>
        Next
      </Button>
    </div>
  );
}

function nextSort(current: { key: string; direction: SortDirection } | null | undefined, key: string) {
  if (current?.key !== key) return { key, direction: "asc" as const };
  if (current.direction === "asc") return { key, direction: "desc" as const };
  return null;
}

function renderCell<T>(row: T, column: TableColumn<T>) {
  if (column.cell) return column.cell(row);
  if (typeof column.accessor === "function") return column.accessor(row);
  if (column.accessor) return row[column.accessor] as ReactNode;
  return null;
}

function alignClass(align: TableColumn<unknown>["align"]) {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return "text-left";
}

function lockedClass(locked: TableColumn<unknown>["locked"], kind: "header" | "cell") {
  if (!locked) return undefined;
  const side = locked === "right" ? "right-0" : "left-0";
  const zIndex = kind === "header" ? "z-30" : "z-10";
  const background = kind === "header" ? "bg-gray-50 dark:bg-neutral-900" : "bg-white dark:bg-neutral-950";
  return cn("sticky shadow-[1px_0_0_theme(colors.gray.200)] dark:shadow-[1px_0_0_theme(colors.neutral.800)]", side, zIndex, background);
}
