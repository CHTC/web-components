/**
 * Process-local memo for GitHub responses.
 *
 * Next.js's data cache already de-duplicates identical fetches, but it is
 * skipped entirely for responses over 2MB. A static export that renders
 * hundreds of pages from one large list endpoint therefore re-requests that
 * endpoint once per page. This keeps a single in-flight promise per request
 * for the length of the revalidate window, so each build makes the request
 * once per worker process instead of once per page.
 *
 * Entries expire after `ttlSeconds` so a long-running `next dev` server still
 * picks up new content on the same schedule as the data cache.
 *
 * Keys are the request URL only, so a process that talks to GitHub as more
 * than one identity would share entries between them. Every getter in this
 * library reads one token from the environment, so that does not arise here.
 */

interface Entry {
  expires: number;
  value: Promise<unknown>;
}

const entries = new Map<string, Entry>();

/** Drop expired entries so a long dev session doesn't grow the map forever. */
function prune(now: number): void {
  for (const [key, entry] of entries) {
    if (entry.expires <= now) entries.delete(key);
  }
}

/**
 * Run `load` once per `key` per TTL window, sharing the promise with every
 * caller that asks in the meantime. A `ttlSeconds` of zero or less disables
 * memoization, matching `revalidate: 0`'s "always fetch fresh".
 */
export function memoize<T>(
  key: string,
  ttlSeconds: number,
  load: () => Promise<T>
): Promise<T> {
  if (ttlSeconds <= 0) return load();

  const now = Date.now();
  const hit = entries.get(key);
  if (hit && hit.expires > now) return hit.value as Promise<T>;

  // A rejected request must not be remembered, or one blip poisons the build.
  const value = load().catch((error) => {
    entries.delete(key);
    throw error;
  });

  if (entries.size > 256) prune(now);
  entries.set(key, { expires: now + ttlSeconds * 1000, value });

  return value;
}

export default memoize;
