import {Article, BackendArticle, Image, tag, website} from "../types";
import matter from "gray-matter";
import {getRawFile} from "./getArticles";

export async function getArticle(organization: string, repo: string, path: string, branch: string): Promise<BackendArticle> {
	const text = await getRawFile(organization, repo, path, branch)
	const frontMatter = matter(text)

	const data = frontMatter.data as Article;

	return {
		path: path,
		slug: getSlug(path),
		date: getDate(path),
		content: frontMatter.content,
		title: data.title,
		author: data.author,
		publish_on: data.publish_on,
		type: data.type,
		tag: data.tag,
		image: data.image,
		excerpt: data?.excerpt,
		banner_src: data?.banner_src,
		banner_alt: data?.banner_alt,
	}
}

function getSlug(path: string){
	const splitSlug = path.slice(0, -3).split("-")
	return [splitSlug[0], splitSlug[1], splitSlug[2], splitSlug.slice(3).join("-")]
}

function getDate(path: string){
	const splitSlug = path.slice(0, -3).split("-")
	return new Date(Date.parse(splitSlug.slice(0, 3).join("-")))
}

export default getArticle
