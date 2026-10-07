import { githubFetch, GITHUB_REVALIDATE } from "./githubFetch";
import { memoize } from "./memo";
import type { GitHubFetchOptions } from "./types";

/** GitHub's maximum, and the right default for endpoints with small items. */
export const DEFAULT_PER_PAGE = 100;

export interface GetAllPagesOptions extends GitHubFetchOptions {
  /**
   * Items per request, up to GitHub's maximum of 100. Defaults to 100.
   *
   * Worth lowering for endpoints whose items are large: Next.js refuses to
   * store any response over 2MB in its data cache, so a page that crosses
   * that line is re-fetched by every route that asks for it. Smaller pages
   * mean a few more requests on a cold cache and far fewer on a warm one.
   */
  perPage?: number;
}

/**
 * Follow a paginated GitHub API list endpoint to the end and return every
 * item as one array.
 *
 * Pagination follows the `Link: <url>; rel="next"` response header, so any
 * query parameters on `apiUrl` are preserved across pages. Results are
 * memoized per process for the revalidate window; callers get a fresh array
 * each time, so sorting or splicing it is safe.
 */
export async function getAllPages<T = unknown>(
  apiUrl: string | URL,
  options?: GetAllPagesOptions
): Promise<T[]> {
  const first = new URL(apiUrl);
  if (!first.searchParams.has("per_page")) {
    first.searchParams.set(
      "per_page",
      String(options?.perPage ?? DEFAULT_PER_PAGE)
    );
  }

  const url = first.toString();
  const revalidate = options?.revalidate ?? GITHUB_REVALIDATE;

  const items = await memoize(`pages:${url}`, revalidate, () =>
    collect<T>(url, options)
  );

  return [...items];
}

/** Walk every page of a list endpoint, starting from a prepared URL. */
async function collect<T>(
  start: string,
  options?: GitHubFetchOptions
): Promise<T[]> {
  const results: T[] = [];

  let url: string | undefined = start;
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
