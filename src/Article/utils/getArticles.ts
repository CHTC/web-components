import { getRepoPaths } from "../../github/getRepoPaths";
import type { GitHubFetchOptions } from "../../github/types";
import { isDatedMarkdown } from "../../utils/isDatedMarkdown";
import { getArticle } from "./getArticle";
import type { BackendArticle } from "../types";

/**
 * Fetch and parse every article in a GitHub repository.
 *
 * Articles are the `YYYY-MM-DD-title.md` files at the repository root.
 */
export async function getArticles(
  organization: string,
  repo: string,
  branch: string,
  options?: GitHubFetchOptions
): Promise<BackendArticle[]> {
  const paths = await getRepoPaths(organization, repo, branch, options);

  return Promise.all(
    paths
      .filter(isDatedMarkdown)
      .map((path) => getArticle(organization, repo, path, branch, options))
  );
}

export default getArticles;
