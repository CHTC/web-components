import type { GitHubFetchOptions } from "./types";

/** Default data-cache lifetime for GitHub responses, in seconds. */
export const GITHUB_REVALIDATE = 60 * 60;

/** Hosts that accept the GitHub token. It is never sent anywhere else. */
const GITHUB_HOSTS = new Set(["api.github.com", "raw.githubusercontent.com"]);

/**
 * The single place this library talks to GitHub.
 *
 * Adds the bearer token (when available and the host is GitHub's), the Next.js
 * data-cache hint, and a default JSON `Accept` header. Throws on any non-2xx
 * response so callers never parse an error page as data.
 */
export async function githubFetch(
  url: string | URL,
  options?: GitHubFetchOptions,
  init: RequestInit = {}
): Promise<Response> {
  const target = new URL(url);
  const token = options?.token ?? process.env.GITHUB_TOKEN;
  const revalidate = options?.revalidate ?? GITHUB_REVALIDATE;

  const headers = new Headers(init.headers);
  if (!headers.has("accept")) {
    headers.set("accept", "application/vnd.github+json");
  }
  if (token && GITHUB_HOSTS.has(target.hostname)) {
    headers.set("authorization", `Bearer ${token}`);
  }

  const res = await fetch(target, {
    ...init,
    headers,
    // Next.js extends RequestInit with `next`; harmless elsewhere.
    ...({ next: { revalidate } } as Record<string, unknown>),
  });

  if (!res.ok) {
    throw new Error(
      `GitHub request failed (${res.status} ${res.statusText}): ${target}`
    );
  }

  return res;
}

export default githubFetch;
