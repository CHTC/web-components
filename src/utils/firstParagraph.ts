import { summarize } from "./summarize";

/**
 * The first prose paragraph of a markdown body, as a description fallback.
 *
 * Not every article carries an `excerpt`, and the alternative is a generic
 * site-wide description on a page about something specific. Bodies in the
 * content repositories open with raw HTML figures, headings and images at
 * least as often as with prose, so those blocks are skipped rather than
 * stripped into noise.
 *
 * @param minLength Shorter leftovers are usually a caption or a stray
 *   attribute rather than a summary of the article.
 */
export function firstParagraph(
  content: string | undefined | null,
  minLength = 40
): string | undefined {
  if (!content) return undefined;

  for (const block of content.split(/\n\s*\n/)) {
    const text = block
      .replace(/<[^>]*>/g, " ") // inline and block HTML
      .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
      .trim();

    // Headings, list items, tables and quotes do not read as a summary.
    if (!text || /^[#>|*\-+]|^\d+\./.test(text)) continue;

    const flat = summarize(text);
    if (flat && flat.length > minLength) return flat;
  }
  return undefined;
}

export default firstParagraph;
