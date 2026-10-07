import type { GitHubRelease, OrganizedReleases } from "../types";

/**
 * Group releases by minor version. Only groups that have a `.0` release are
 * kept, so a stray patch release without its parent doesn't render alone.
 *
 * Tags that aren't `vMAJOR.MINOR.PATCH` are ignored.
 */
export function organizeReleases(releases: GitHubRelease[]): OrganizedReleases {
  const organized: OrganizedReleases = {};

  for (const release of releases) {
    const match = release.tag_name.match(/^(v\d+\.\d+)\.(\d+)$/);
    if (!match) continue;

    const [, minorVersion, patch] = match;
    const group = (organized[minorVersion] ??= { minorReleases: [] });

    if (patch === "0") {
      group.mainRelease = release;
    } else {
      group.minorReleases.push(release);
    }
  }

  return Object.fromEntries(
    Object.entries(organized).filter(([, group]) => group.mainRelease)
  );
}

export default organizeReleases;
