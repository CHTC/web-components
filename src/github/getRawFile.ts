import { githubFetch } from "./githubFetch";
import type { GitHubFetchOptions } from "./types";

/**
 * The text contents of one file in a branch.
 */
export async function getRawFile(
  organization: string,
  repo: string,
  path: string,
  branch: string,
  options?: GitHubFetchOptions
): Promise<string> {
  const url = `https://raw.githubusercontent.com/${organization}/${repo}/${branch}/${path}`;
  const res = await githubFetch(url, options, {
    headers: { accept: "application/vnd.github.raw" },
  });
  return await res.text();
}

export default getRawFile;
