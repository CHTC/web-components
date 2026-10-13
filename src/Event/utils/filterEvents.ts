import type { Website } from "../../types";
import type { BackendEvent } from "../types";

/**
 * Keep the events tagged for a site and not withheld.
 *
 * `published` is opt-out rather than opt-in: an event without the field is
 * shown, matching how the content repository is written.
 */
export function filterEvents(
  events: BackendEvent[],
  publish_on: Website
): BackendEvent[] {
  return events.filter(
    (event) =>
      (event?.published ?? true) && (event?.publish_on?.includes(publish_on) ?? false)
  );
}

export default filterEvents;
