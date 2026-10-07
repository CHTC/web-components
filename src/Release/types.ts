/**
 * Subset of GitHub's release payload that the sites render.
 * https://docs.github.com/en/rest/releases/releases
 */
export interface GitHubRelease {
  id: number;
  name: string;
  tag_name: string;
  target_commitish: string;
  body: string;
  html_url: string;
  published_at: string;
  prerelease: boolean;
  draft: boolean;
}

/**
 * Releases grouped by minor version (`v7.18`), each with its `.0` release and
 * the patch releases that followed it.
 */
export type OrganizedReleases = {
  [minorVersion: string]: {
    mainRelease?: GitHubRelease;
    minorReleases: GitHubRelease[];
  };
};
