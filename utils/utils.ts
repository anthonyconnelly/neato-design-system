export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

export function parseDate(value: string): Date {
  if (/^\d{8}$/.test(value)) {
    const y = Number.parseInt(value.slice(0, 4), 10);
    const m = Number.parseInt(value.slice(4, 6), 10) - 1;
    const d = Number.parseInt(value.slice(6, 8), 10);
    return new Date(y, m, d);
  }
  return new Date(value);
}

export function formatDate(value: string): string {
  const date = parseDate(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function toMonthString(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  return `${year}-${month}`;
}

export function monthLabel(month: string): string {
  const [year, monthNum] = month.split("-").map(Number);
  // Use the 15th to avoid timezone edge cases at month boundaries
  const value = new Date(year, monthNum - 1, 15);
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(value);
}

export function shiftMonth(month: string, delta: number): string {
  const [year, monthNum] = month.split("-").map(Number);
  const shifted = new Date(year, monthNum - 1 + delta, 15);
  return toMonthString(shifted);
}
