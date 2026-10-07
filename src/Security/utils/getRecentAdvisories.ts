import { getAdvisoryPublishedTime } from "./getAdvisoryPublishedTime";
import type { SecurityAdvisory } from "../types";

/**
 * How recently an advisory must have been published to count as breaking news
 * (e.g. a "New" badge on an advisory list).
 */
export const RECENT_ADVISORY_WINDOW_DAYS = 7;

/**
 * Advisories published within the last `windowDays`.
 *
 * `now` is evaluated when the site is built, not when it is viewed, on a
 * statically exported site. Rebuilding several times a day keeps the badge
 * roughly current and lets it age off on its own.
 */
export function getRecentAdvisories(
  advisories: SecurityAdvisory[],
  now: number = Date.now(),
  windowDays: number = RECENT_ADVISORY_WINDOW_DAYS
): SecurityAdvisory[] {
  const cutoff = now - windowDays * 24 * 60 * 60 * 1000;
  return advisories.filter((advisory) => getAdvisoryPublishedTime(advisory) >= cutoff);
}

export default getRecentAdvisories;
