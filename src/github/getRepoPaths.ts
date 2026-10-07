import { getTree } from "./getTree";
import type { GitHubFetchOptions } from "./types";

/**
 * Every file path in a branch, relative to the repository root.
 */
export async function getRepoPaths(
  organization: string,
  repo: string,
  branch: string,
  options?: GitHubFetchOptions
): Promise<string[]> {
  const tree = await getTree(organization, repo, branch, options);
  return tree.tree.map((item) => item.path);
}

export default getRepoPaths;
