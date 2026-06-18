/**
 * Formats a date as e.g. "January 5, 2025" in UTC, matching the display format
 * used across the presentation components.
 */
export function formatLongDate(date: string | number | Date): string {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
