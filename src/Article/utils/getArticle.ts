import matter from "@11ty/gray-matter";

import { getRawFile } from "../../github/getRawFile";
import type { GitHubFetchOptions } from "../../github/types";
import type { Website } from "../../types";
import { getDateFromPath } from "../../utils/getDateFromPath";
import { getSlugFromPath } from "../../utils/getSlugFromPath";
import { toArray } from "../../utils/toArray";
import type { ArticleImage, ArticleTag, ArticleType, BackendArticle } from "../types";

/**
 * Fetch and parse one article from a GitHub repository.
 *
 * @param path Path of the markdown file inside the repo, e.g. `2026-10-06-some-title.md`.
 */
export async function getArticle(
  organization: string,
  repo: string,
  path: string,
  branch: string,
  options?: GitHubFetchOptions
): Promise<BackendArticle> {
  const text = await getRawFile(organization, repo, path, branch, options);
  const frontMatter = matter(text);
  const data = (frontMatter.data ?? {}) as Record<string, unknown>;

  return {
    path,
    slug: getSlugFromPath(path),
    date: getDateFromPath(path),
    content: frontMatter.content,
    title: data.title as string,
    author: data.author as string | undefined,
    publish_on: toArray<Website>(data.publish_on as Website | Website[] | undefined),
    type: data.type as ArticleType,
    tag: data.tag ? toArray<ArticleTag>(data.tag as ArticleTag | ArticleTag[]) : undefined,
    image: data.image as ArticleImage,
    excerpt: data.excerpt as string | undefined,
    banner_src: data.banner_src as string | undefined,
    banner_alt: data.banner_alt as string | undefined,
    canonical_url: data.canonical_url as string | undefined,
  };
}

export default getArticle;
