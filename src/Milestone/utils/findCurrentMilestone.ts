import type { GitHubMilestone } from "../types";

/** Milestones named like a release: `v7.18` or `7.18`. */
export const RELEASE_MILESTONE = /^v?\d+\.\d+$/;

/**
 * The release milestone currently being worked toward: the first open one
 * whose title matches `pattern`, in the order given (so pass milestones sorted
 * soonest-due first).
 *
 * If nothing is open, falls back to the most recently listed closed release
 * milestone so a release-plan page can still render something sensible.
 * Returns undefined when no milestone matches `pattern` at all.
 */
export function findCurrentMilestone(
  milestones: GitHubMilestone[],
  pattern: RegExp = RELEASE_MILESTONE
): GitHubMilestone | undefined {
  const releases = milestones.filter((milestone) => pattern.test(milestone.title));

  return (
    releases.find((milestone) => milestone.state === "open") ??
    releases.filter((milestone) => milestone.state === "closed").pop() ??
    releases[0]
  );
}

export default findCurrentMilestone;
