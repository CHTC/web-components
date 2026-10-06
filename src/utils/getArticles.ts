import {BackendArticle} from "../types";
import getArticle from "./getArticle";

/**
 * Options shared by the GitHub fetch helpers.
 */
export interface GitHubFetchOptions {
	/**
	 * GitHub token sent as a bearer token. Defaults to `process.env.GITHUB_TOKEN`
	 * when that is set. Raises the API rate limit from 60 to 5,000 requests/hour.
	 */
	token?: string;
	/**
	 * Seconds to keep responses in Next.js's data cache (`next: { revalidate }`).
	 * Defaults to one hour so dev renders and incremental rebuilds don't re-hit
	 * GitHub for every article. Pass `0` to always fetch fresh.
	 */
	revalidate?: number;
}

/** Default data-cache lifetime for GitHub responses, in seconds. */
export const GITHUB_REVALIDATE = 60 * 60;

function buildInit(options?: GitHubFetchOptions, headers: Record<string, string> = {}): RequestInit {
	const token = options?.token ?? process.env.GITHUB_TOKEN
	const revalidate = options?.revalidate ?? GITHUB_REVALIDATE

	return {
		headers: {
			...headers,
			...(token ? {authorization: `Bearer ${token}`} : {}),
		},
		// Next.js extends RequestInit with `next`; harmless elsewhere.
		...({next: {revalidate}} as Record<string, unknown>),
	}
}

/** Matches article files named `YYYY-MM-DD-title.md` at the repo root. */
export function isArticle(path: string): boolean {
	return /^\d{4}-\d{1,2}-\d{1,2}-.+\.md$/.test(path)
}

/**
 * Fetch and parse every article in a GitHub repository.
 */
export async function getArticles(
	organization: string,
	repo: string,
	branch: string,
	options?: GitHubFetchOptions
): Promise<BackendArticle[]> {
	const tree = await getTree(organization, repo, branch, options)
	const paths = getPaths(tree)

	// Filter out the non-article paths and pull down and parse the remote files
	return Promise.all(
			paths
					.filter((path) => isArticle(path))
					.map((path) => getArticle(organization, repo, path, branch, options))
	)
}

/** Newest first, by the date in the file name. */
export function sortArticles(articles: BackendArticle[]): BackendArticle[] {
	return [...articles].sort(
			(a, b) => b.date.getTime() - a.date.getTime() || b.path.localeCompare(a.path)
	)
}

export async function getTree(
	organization: string,
	repo: string,
	branch: string,
	options?: GitHubFetchOptions
): Promise<GitTree> {
	const url = `https://api.github.com/repos/${organization}/${repo}/git/trees/${branch}?recursive=1`
	const res = await fetch(url, buildInit(options))
	if (!res.ok) {
		throw new Error(`Failed to fetch git tree (${res.status} ${res.statusText}): ${url}`)
	}
	const json = await res.json()
	return json as GitTree
}

export function getPaths(tree: GitTree) : string[] {
	return tree.tree.map((item) => item['path'])
}

export async function getRawFile(
	organization: string,
	repo: string,
	path: string,
	branch: string,
	options?: GitHubFetchOptions
): Promise<string> {

	const url = new URL(`https://raw.githubusercontent.com/${organization}/${repo}/${branch}/${path}`)

	const res = await fetch(url, buildInit(options, {"Accept": "application/vnd.github.raw"}))
	if (!res.ok) {
		throw new Error(`Failed to fetch raw file (${res.status} ${res.statusText}): ${path}`)
	}

	return await res.text()
}

export interface GitHubReleaseData {
	tag_name: string;
	target_commitish: string;
	body: string;
}

export interface ReleasePageProps {
	releaseData: GitHubReleaseData;
}

export interface GithubMilestoneData {
	title: string;
	state: "open" | "closed";
	created_at: string;
	updated_at: string;
	closed_at: string;
	due_on: string;
}

export interface GitTreeItem {
	path: string;
	mode: string;
	type: string;
	sha: string;
	size: number;
	url: string;
}

export interface GitTree {
	sha: string;
	url: string;
	tree: GitTreeItem[];
}

export default getArticles
