/**
 * Flatten a frontmatter excerpt into a single line of plain text.
 *
 * Excerpts in the content repositories are YAML block scalars, so they arrive
 * with hard line breaks and trailing newlines, and many carry light markdown.
 * Meta descriptions and link previews want one unformatted line, and search
 * engines cut them around 160 characters, so this trims at a word boundary
 * rather than mid-word.
 *
 * @param limit Maximum length before an ellipsis is appended.
 */
export function summarize(
  text: string | undefined | null,
  limit = 200
): string | undefined {
  if (!text) return undefined;

  const flat = text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // markdown links keep their text
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!flat) return undefined;
  if (flat.length <= limit) return flat;

  const cut = flat.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  // Only break on a space if one falls reasonably late, so a single very long
  // token cannot collapse the summary to almost nothing.
  return `${(lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

export default summarize;
