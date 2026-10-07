import yaml from "js-yaml";

import { getRawFile } from "../../github/getRawFile";
import { getRepoPaths } from "../../github/getRepoPaths";
import type { GitHubFetchOptions } from "../../github/types";
import type { Website } from "../../types";
import type { Staff } from "../types";

export interface GetStaffOptions extends GitHubFetchOptions {
  organization?: string;
  repo?: string;
  branch?: string;
  /** Base URL that staff image paths are resolved against. */
  imageBaseUrl?: string;
}

const DEFAULTS: Required<Pick<GetStaffOptions, "organization" | "repo" | "branch" | "imageBaseUrl">> = {
  organization: "chtc",
  repo: "staff-list",
  branch: "init-staff-list",
  imageBaseUrl: "https://chtc.github.io/staff-list/",
};

/**
 * Every person in the shared staff list, with the overrides for `website`
 * applied and image paths made absolute.
 *
 * Staff files are the `.yml` files at the repository root.
 */
export async function getStaff(
  website: Website,
  options: GetStaffOptions = {}
): Promise<Staff[]> {
  const { organization, repo, branch, imageBaseUrl, ...fetchOptions } = {
    ...DEFAULTS,
    ...options,
  };

  const paths = await getRepoPaths(organization, repo, branch, fetchOptions);

  return Promise.all(
    paths
      .filter((path) => path.endsWith(".yml") && !path.includes("/"))
      .map((path) =>
        getStaffMember(organization, repo, path, branch, website, imageBaseUrl, fetchOptions)
      )
  );
}

async function getStaffMember(
  organization: string,
  repo: string,
  path: string,
  branch: string,
  website: Website,
  imageBaseUrl: string,
  options: GitHubFetchOptions
): Promise<Staff> {
  const text = await getRawFile(organization, repo, path, branch, options);
  const data = yaml.load(text) as Staff;

  return {
    ...data,
    ...data?.[website],
    image: new URL(data.image, imageBaseUrl).toString(),
  };
}

export default getStaff;
