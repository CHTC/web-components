import {BackendArticle} from "../types";
import getArticle from "./getArticle";

function isArticle(path: string){
	const regex = /\d\d\d\d-\d\d?-\d\d?-.*?\.md/g
	return path.search(regex) != -1
}

export async function getArticles(organization: string, repo: string, branch: string): Promise<BackendArticle[]> {
	const tree = await getTree(organization, repo, branch)
	const paths = getPaths(tree)

	// Filter out the non-article paths and pull down and parse the remote files
	return Promise.all(
			paths
					.filter((path) => isArticle(path))
					.map((path) => getArticle(organization, repo, path, branch))
	)
}

export async function getTree(organization: string, repo: string, branch: string): Promise<GitTree> {
	const url = `https://api.github.com/repos/${organization}/${repo}/git/trees/${branch}?recursive=1`
	const res = await fetch(url)
	if (!res.ok) {
		throw new Error(`Failed to fetch git tree (${res.status} ${res.statusText}): ${url}`)
	}
	const json = await res.json()
	return json as GitTree
}

export function getPaths(tree: GitTree) : string[] {
	return tree.tree.map((item) => item['path'])
}

export async function getRawFile(organization: string, repo: string, path: string, branch: string): Promise<string> {

	const url = new URL(`https://raw.githubusercontent.com/${organization}/${repo}/${branch}/${path}`)

	const res = await fetch(url, {headers: {"Accept": "application/vnd.github.raw"}})
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

interface GitTreeItem {
	path: string;
	mode: string;
	type: string;
	sha: string;
	size: number;
	url: string;
}

interface GitTree {
	sha: string;
	url: string;
	tree: GitTreeItem[];
}

export default getArticles