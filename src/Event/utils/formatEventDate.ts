/**
 * Format an event's date range for display, collapsing whatever the two dates
 * share.
 *
 * `August 5–9, 2024`, `March 29, 2024`, `January 30 – February 2, 2024`, or
 * `December 30, 2024 – January 2, 2025`.
 *
 * Dates are `YYYY-MM-DD` and are read as UTC so a viewer's timezone cannot
 * shift an event a day.
 */
export function formatEventDate(start: string, end?: string): string {
  if (!start) return "";
  const startDate = new Date(`${start}T00:00:00Z`);
  const endDate = end ? new Date(`${end}T00:00:00Z`) : startDate;

  const month = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "long", timeZone: "UTC" });
  const day = (d: Date) => d.getUTCDate();
  const year = (d: Date) => d.getUTCFullYear();

  if (start === end || !end) {
    return `${month(startDate)} ${day(startDate)}, ${year(startDate)}`;
  }
  if (year(startDate) !== year(endDate)) {
    return `${month(startDate)} ${day(startDate)}, ${year(startDate)} – ${month(endDate)} ${day(endDate)}, ${year(endDate)}`;
  }
  if (month(startDate) !== month(endDate)) {
    return `${month(startDate)} ${day(startDate)} – ${month(endDate)} ${day(endDate)}, ${year(endDate)}`;
  }
  return `${month(startDate)} ${day(startDate)}–${day(endDate)}, ${year(endDate)}`;
}

export default formatEventDate;
