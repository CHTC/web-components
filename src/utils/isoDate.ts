/**
 * An ISO timestamp for a frontmatter date, or `undefined` if unusable.
 *
 * The getters in this library hand back both shapes: `Date` objects parsed
 * from a `YYYY-MM-DD-title.md` file name, and plain `YYYY-MM-DD` strings
 * taken straight from frontmatter. Bare date strings are read as UTC
 * midnight so a build's local timezone cannot shift them a day.
 */
export function isoDate(
  value: Date | string | undefined | null
): string | undefined {
  if (!value) return undefined;
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export default isoDate;
