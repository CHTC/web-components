/**
 * Matches content files named `YYYY-MM-DD-title.md` at the repository root.
 * Articles and presentations both use this convention.
 */
export function isDatedMarkdown(path: string): boolean {
  return /^\d{4}-\d{1,2}-\d{1,2}-.+\.md$/.test(path);
}

export default isDatedMarkdown;
