/**
 * Date encoded in a `YYYY-MM-DD-title.md` file name, as UTC midnight.
 */
export function getDateFromPath(path: string): Date {
  const parts = path.slice(0, -3).split("-");
  return new Date(Date.parse(parts.slice(0, 3).join("-")));
}

export default getDateFromPath;
