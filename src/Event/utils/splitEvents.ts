import type { BackendEvent, EventData } from "../types";

/** True when an event's end date is today or later, in UTC. */
export function isUpcoming(event: EventData): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return event.end_date >= today;
}

/**
 * Split events into upcoming and past.
 *
 * Upcoming runs soonest first — the next thing to attend belongs at the top —
 * while past runs most recent first. Dates are `YYYY-MM-DD`, so they compare
 * correctly as strings.
 */
export function splitEvents(events: BackendEvent[]): {
  upcoming: BackendEvent[];
  past: BackendEvent[];
} {
  const upcoming = events
    .filter(isUpcoming)
    .sort((a, b) => a.end_date.localeCompare(b.end_date));
  const past = events
    .filter((event) => !isUpcoming(event))
    .sort((a, b) => b.end_date.localeCompare(a.end_date));
  return { upcoming, past };
}

export default splitEvents;
