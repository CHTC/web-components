/**
 * Split a dated markdown file name into its URL slug segments.
 *
 * `2026-10-06-some-title.md` → `["2026", "10", "06", "some-title"]`
 */
export function getSlugFromPath(path: string): string[] {
  const parts = path.slice(0, -3).split("-");
  return [parts[0], parts[1], parts[2], parts.slice(3).join("-")];
}

export default getSlugFromPath;
