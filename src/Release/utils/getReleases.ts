import { getAllPages } from "../../github/getAllPages";
import type { GetAllPagesOptions } from "../../github/getAllPages";
import type { GitHubRelease } from "../types";

export interface GetReleasesOptions extends GetAllPagesOptions {
  /** Include release candidates and other prereleases. Defaults to false. */
  includePrereleases?: boolean;
}

/** Tags like `v7.18.0-rc.0` that GitHub may or may not have flagged as prerelease. */
const RELEASE_CANDIDATE = /-rc(\.|\d|$)/i;

/**
 * Releases per request.
 *
 * Release objects are far larger than they look: GitHub inlines the full asset
 * list, and each asset carries a complete uploader object. For a project that
 * ships a binary per platform that runs to roughly 80KB per release, so
 * GitHub's maximum of 100 produces a 7MB response — well over the 2MB ceiling
 * on Next.js's data cache, which means it is never cached and every page that
 * lists releases re-downloads the lot.
 *
 * Fifteen holds the densest page near 1.2MB. That leaves room for the asset
 * list to keep growing: at twenty, measured pages already reached 1.6MB, and
 * crossing the ceiling again is silent — the only symptom is a slow build.
 */
const RELEASES_PER_PAGE = 15;

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

  const releases = await getAllPages<GitHubRelease>(url, {
    perPage: RELEASES_PER_PAGE,
    ...fetchOptions,
  });

  return releases.filter(
    (release) =>
      !release.draft &&
      (includePrereleases ||
        (!release.prerelease && !RELEASE_CANDIDATE.test(release.tag_name)))
  );
}

export default getReleases;
