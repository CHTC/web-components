import { getAllPages } from "../../github/getAllPages";
import type { GitHubFetchOptions } from "../../github/types";
import type { GitHubRelease } from "../types";

export interface GetReleasesOptions extends GitHubFetchOptions {
  /** Include release candidates and other prereleases. Defaults to false. */
  includePrereleases?: boolean;
}

/** Tags like `v7.18.0-rc.0` that GitHub may or may not have flagged as prerelease. */
const RELEASE_CANDIDATE = /-rc(\.|\d|$)/i;

/**
 * Every release of a repository, as GitHub orders them (newest first).
 * Drafts are always dropped; prereleases are dropped unless asked for.
 */
export async function getReleases(
  organization: string,
  repo: string,
  options: GetReleasesOptions = {}
): Promise<GitHubRelease[]> {
  const { includePrereleases = false, ...fetchOptions } = options;
  const url = `https://api.github.com/repos/${organization}/${repo}/releases`;

  const releases = await getAllPages<GitHubRelease>(url, fetchOptions);

  return releases.filter(
    (release) =>
      !release.draft &&
      (includePrereleases ||
        (!release.prerelease && !RELEASE_CANDIDATE.test(release.tag_name)))
  );
}

export default getReleases;
