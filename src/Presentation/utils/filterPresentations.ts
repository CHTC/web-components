import type { Website } from "../../types";
import type { BackendPresentation } from "../types";

/**
 * Keep the published presentations tagged for a site. A presentation with no
 * `published` field counts as published.
 */
export function filterPresentations(
  presentations: BackendPresentation[],
  publish_on: Website
): BackendPresentation[] {
  return presentations.filter(
    (presentation) =>
      (presentation.published ?? true) &&
      (presentation.publish_on ?? []).includes(publish_on)
  );
}

export default filterPresentations;
