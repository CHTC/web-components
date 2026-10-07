/**
 * Format a date as e.g. "January 5, 2025" in UTC, the display format used
 * across the content components.
 */
export function formatLongDate(date: string | number | Date): string {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default formatLongDate;
