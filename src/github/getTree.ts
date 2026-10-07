import { githubFetch, GITHUB_REVALIDATE } from "./githubFetch";
import { memoize } from "./memo";
import type { GitHubFetchOptions, GitTree } from "./types";

/**
 * The full recursive file tree of a branch.
 *
 * Memoized per process for the revalidate window, since every page built from
 * a content repo starts by asking for the same tree.
 */
export async function getTree(
  organization: string,
  repo: string,
  branch: string,
  options?: GitHubFetchOptions
): Promise<GitTree> {
  const url = `https://api.github.com/repos/${organization}/${repo}/git/trees/${branch}?recursive=1`;
  const revalidate = options?.revalidate ?? GITHUB_REVALIDATE;

  return memoize(`tree:${url}`, revalidate, async () => {
    const res = await githubFetch(url, options);
    return (await res.json()) as GitTree;
  });
}

export default getTree;
