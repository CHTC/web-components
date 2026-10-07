import { getAllPages } from "../../github/getAllPages";
import type { GitHubFetchOptions } from "../../github/types";
import type { GitHubMilestone } from "../types";

export interface GetMilestonesOptions extends GitHubFetchOptions {
  /** Defaults to "all" so closed milestones are available for fallbacks. */
  state?: "open" | "closed" | "all";
  /** Sort field. Defaults to GitHub's `due_on`. */
  sort?: "due_on" | "completeness";
  /** Defaults to ascending so the soonest-due milestone comes first. */
  direction?: "asc" | "desc";
}

/**
 * Every milestone of a repository, soonest due first by default.
 */
export async function getMilestones(
  organization: string,
  repo: string,
  options: GetMilestonesOptions = {}
): Promise<GitHubMilestone[]> {
  const { state = "all", sort = "due_on", direction = "asc", ...fetchOptions } = options;

  const url = new URL(`https://api.github.com/repos/${organization}/${repo}/milestones`);
  url.searchParams.set("state", state);
  url.searchParams.set("sort", sort);
  url.searchParams.set("direction", direction);

  return getAllPages<GitHubMilestone>(url, fetchOptions);
}

export default getMilestones;
