/**
 * Options accepted by every GitHub getter in this library.
 */
export interface GitHubFetchOptions {
  /**
   * GitHub token sent as a bearer token to api.github.com and
   * raw.githubusercontent.com. Defaults to `process.env.GITHUB_TOKEN` when set.
   * Raises the API rate limit from 60 to 5,000 requests per hour.
   */
  token?: string;
  /**
   * Seconds to keep responses in Next.js's data cache (`next: { revalidate }`).
   * Defaults to one hour so dev renders and incremental rebuilds don't re-hit
   * GitHub for every file. Pass `0` to always fetch fresh.
   */
  revalidate?: number;
}

export interface GitTreeItem {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size: number;
  url: string;
}

export interface GitTree {
  sha: string;
  url: string;
  tree: GitTreeItem[];
  truncated: boolean;
}
