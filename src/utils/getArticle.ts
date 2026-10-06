import matter from "gray-matter";

import {article_type, BackendArticle, Image, tag, website} from "../types";
import {getRawFile, GitHubFetchOptions} from "./getArticles";

/** Frontmatter may give list fields as a single scalar; always return an array. */
function toArray<T>(value: unknown): T[] | undefined {
	if (value === undefined || value === null) return undefined;
	return (Array.isArray(value) ? value : [value]) as T[];
}

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
	const text = await getRawFile(organization, repo, path, branch, options)
	const frontMatter = matter(text)

	const data = frontMatter.data as Record<string, unknown>;

	return {
		path: path,
		slug: getSlug(path),
		date: getDate(path),
		content: frontMatter.content,
		title: data.title as string,
		author: data.author as string | undefined,
		publish_on: toArray<website>(data.publish_on) ?? [],
		type: data.type as article_type,
		tag: toArray<tag>(data.tag),
		image: data.image as Image,
		excerpt: data.excerpt as string | undefined,
		banner_src: data.banner_src as string | undefined,
		banner_alt: data.banner_alt as string | undefined,
		canonical_url: data.canonical_url as string | undefined,
	}
}

/** `2026-10-06-some-title.md` → `["2026", "10", "06", "some-title"]` */
export function getSlug(path: string): string[] {
	const splitSlug = path.slice(0, -3).split("-")
	return [splitSlug[0], splitSlug[1], splitSlug[2], splitSlug.slice(3).join("-")]
}

/** Date encoded in the file name prefix, as UTC midnight. */
export function getDate(path: string): Date {
	const splitSlug = path.slice(0, -3).split("-")
	return new Date(Date.parse(splitSlug.slice(0, 3).join("-")))
}

export default getArticle
