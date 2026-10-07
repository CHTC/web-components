import { githubFetch } from "./githubFetch";
import type { GitHubFetchOptions, GitTree } from "./types";

/**
 * The full recursive file tree of a branch.
 */
export async function getTree(
  organization: string,
  repo: string,
  branch: string,
  options?: GitHubFetchOptions
): Promise<GitTree> {
  const url = `https://api.github.com/repos/${organization}/${repo}/git/trees/${branch}?recursive=1`;
  const res = await githubFetch(url, options);
  return (await res.json()) as GitTree;
}

export default getTree;
