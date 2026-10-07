import { githubFetch, GITHUB_REVALIDATE } from "./githubFetch";
import { memoize } from "./memo";
import type { GitHubFetchOptions } from "./types";

/**
 * The text contents of one file in a branch.
 *
 * Memoized per process for the revalidate window: an index page and the detail
 * page for the same article both read the same file.
 */
export async function getRawFile(
  organization: string,
  repo: string,
  path: string,
  branch: string,
  options?: GitHubFetchOptions
): Promise<string> {
  const url = `https://raw.githubusercontent.com/${organization}/${repo}/${branch}/${path}`;
  const revalidate = options?.revalidate ?? GITHUB_REVALIDATE;

  return memoize(`raw:${url}`, revalidate, async () => {
    const res = await githubFetch(url, options, {
      headers: { accept: "application/vnd.github.raw" },
    });
    return await res.text();
  });
}

export default getRawFile;
