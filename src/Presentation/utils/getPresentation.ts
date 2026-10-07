import matter from "@11ty/gray-matter";

import { getRawFile } from "../../github/getRawFile";
import type { GitHubFetchOptions } from "../../github/types";
import type { Website } from "../../types";
import { getSlugFromPath } from "../../utils/getSlugFromPath";
import { toArray } from "../../utils/toArray";
import type { BackendPresentation, PresentationLink } from "../types";

/**
 * Fetch and parse one presentation from a GitHub repository.
 *
 * @param path Path of the markdown file inside the repo, e.g. `2025-06-04-some-talk.md`.
 */
export async function getPresentation(
  organization: string,
  repo: string,
  path: string,
  branch: string,
  options?: GitHubFetchOptions
): Promise<BackendPresentation> {
  const text = await getRawFile(organization, repo, path, branch, options);
  const data = (matter(text).data ?? {}) as Record<string, any>;

  // `?? undefined` collapses YAML nulls (a key written with no value) so the
  // components' default parameters kick in instead of receiving null.
  return {
    title: data.title ?? "",
    presenter: data.presenter ?? "",
    event: data.event ?? undefined,
    date: data.date ?? "",
    publish_on: toArray<Website>(data.publish_on),
    published: data.published ?? undefined,
    description: data.description ?? undefined,
    keywords: toArray<string>(data.keywords),
    links: toArray<PresentationLink>(data.links),
    thumbnail: data.image?.path
      ? { src: data.image.path, alt: data.image.alt ?? "" }
      : undefined,
    youtubeId: data.youtube_video_id ?? undefined,
    slug: getSlugFromPath(path),
    path,
  };
}

export default getPresentation;
