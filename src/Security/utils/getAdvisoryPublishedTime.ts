import type { SecurityAdvisory } from "../types";

/** Epoch millis an advisory went public; unpublished sorts last (0). */
export function getAdvisoryPublishedTime(advisory: SecurityAdvisory): number {
  return advisory.published_at ? Date.parse(advisory.published_at) : 0;
}

export default getAdvisoryPublishedTime;
