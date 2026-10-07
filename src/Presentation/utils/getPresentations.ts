import { getRepoPaths } from "../../github/getRepoPaths";
import type { GitHubFetchOptions } from "../../github/types";
import { isDatedMarkdown } from "../../utils/isDatedMarkdown";
import { getPresentation } from "./getPresentation";
import type { BackendPresentation } from "../types";

/**
 * Fetch and parse every presentation in a GitHub repository.
 *
 * Presentations are the `YYYY-MM-DD-title.md` files at the repository root.
 * Nothing is filtered here; use `filterPresentations` to pick a site's
 * published talks.
 */
export async function getPresentations(
  organization: string,
  repo: string,
  branch: string,
  options?: GitHubFetchOptions
): Promise<BackendPresentation[]> {
  const paths = await getRepoPaths(organization, repo, branch, options);

  return Promise.all(
    paths
      .filter(isDatedMarkdown)
      .map((path) => getPresentation(organization, repo, path, branch, options))
  );
}

export default getPresentations;
