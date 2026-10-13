import { getRepoPaths } from "../../github/getRepoPaths";
import type { GitHubFetchOptions } from "../../github/types";
import { isDatedMarkdown } from "../../utils/isDatedMarkdown";
import type { BackendEvent } from "../types";
import { getEvent } from "./getEvent";

/**
 * Fetch and parse every event in a GitHub repository.
 *
 * Events are the `YYYY-MM-DD-title.md` files at the repository root. The
 * result is unfiltered; narrow it with `filterEvents`.
 */
export async function getEvents(
  organization: string,
  repo: string,
  branch: string,
  options?: GitHubFetchOptions
): Promise<BackendEvent[]> {
  const paths = await getRepoPaths(organization, repo, branch, options);
  return Promise.all(
    paths
      .filter(isDatedMarkdown)
      .map((path) => getEvent(organization, repo, path, branch, options))
  );
}

export default getEvents;
