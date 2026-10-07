import { getAllPages } from "../../github/getAllPages";
import type { GitHubFetchOptions } from "../../github/types";
import { getAdvisoryPublishedTime } from "./getAdvisoryPublishedTime";
import type { SecurityAdvisory } from "../types";

/**
 * Every published, non-withdrawn security advisory for a repository, newest
 * first.
 *
 * Draft and withdrawn advisories are dropped: a draft isn't public yet, and a
 * withdrawn one was retracted, so republishing either would be wrong.
 */
export async function getSecurityAdvisories(
  organization: string,
  repo: string,
  options?: GitHubFetchOptions
): Promise<SecurityAdvisory[]> {
  const url = `https://api.github.com/repos/${organization}/${repo}/security-advisories`;
  const advisories = await getAllPages<SecurityAdvisory>(url, options);

  return advisories
    .filter((advisory) => advisory.state === "published" && !advisory.withdrawn_at)
    .sort((a, b) => getAdvisoryPublishedTime(b) - getAdvisoryPublishedTime(a));
}

export default getSecurityAdvisories;
