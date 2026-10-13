import matter from "@11ty/gray-matter";

import { getRawFile } from "../../github/getRawFile";
import type { GitHubFetchOptions } from "../../github/types";
import type { Website } from "../../types";
import { getSlugFromPath } from "../../utils/getSlugFromPath";
import { toArray } from "../../utils/toArray";
import type { BackendEvent, EventImage } from "../types";

/**
 * Coerce a frontmatter date into a `YYYY-MM-DD` string.
 *
 * An unquoted YAML date (`start_date: 2024-08-05`) is parsed into a JS `Date`
 * by js-yaml, so it is normalized through UTC; quoting it in the source file
 * yields a string, which is passed through untouched.
 */
function toISODate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

/**
 * Fetch and parse one event from a GitHub repository.
 *
 * @param path Path of the markdown file inside the repo, e.g. `2026-06-09-htc26.md`.
 */
export async function getEvent(
  organization: string,
  repo: string,
  path: string,
  branch: string,
  options?: GitHubFetchOptions
): Promise<BackendEvent> {
  const text = await getRawFile(organization, repo, path, branch, options);
  const frontMatter = matter(text);
  const data = (frontMatter.data ?? {}) as Record<string, unknown>;

  const start_date = toISODate(data.start_date);

  return {
    path,
    slug: getSlugFromPath(path),
    content: frontMatter.content,
    title: data.title as string,
    short_title: data.short_title as string | undefined,
    published: data.published as boolean | undefined,
    start_date,
    // A single-day event often omits the end date rather than repeating it.
    end_date: toISODate(data.end_date) || start_date,
    publish_on: toArray<Website>(data.publish_on as Website | Website[] | undefined),
    tags: data.tags ? toArray<string>(data.tags as string | string[]) : undefined,
    excerpt: data.excerpt as string | undefined,
    image: data.image as EventImage | undefined,
    banner: data.banner as EventImage | undefined,
    sidebar: data.sidebar as string | undefined,
    endblock: data.endblock as string | undefined,
  };
}

export default getEvent;
