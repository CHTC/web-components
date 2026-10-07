import { githubFetch } from "./githubFetch";
import type { GitHubFetchOptions } from "./types";

/**
 * Follow a paginated GitHub API list endpoint to the end and return every
 * item as one array.
 *
 * Pagination follows the `Link: <url>; rel="next"` response header, so any
 * query parameters on `apiUrl` are preserved across pages.
 */
export async function getAllPages<T = unknown>(
  apiUrl: string | URL,
  options?: GitHubFetchOptions
): Promise<T[]> {
  const results: T[] = [];

  const first = new URL(apiUrl);
  if (!first.searchParams.has("per_page")) {
    first.searchParams.set("per_page", "100");
  }

  let url: string | undefined = first.toString();
  while (url) {
    const res = await githubFetch(url, options);
    results.push(...((await res.json()) as T[]));
    url = getNextPageUrl(res.headers.get("link"));
  }

  return results;
}

/** Parse `<https://...?page=2>; rel="next"` out of a Link header. */
function getNextPageUrl(linkHeader: string | null): string | undefined {
  if (!linkHeader) return undefined;
  const next = linkHeader
    .split(",")
    .find((link) => link.trim().endsWith('rel="next"'));
  return next?.match(/<([^>]+)>/)?.[1];
}

export default getAllPages;
