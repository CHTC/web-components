import {article_type, BackendArticle, website} from "../types";

/**
 * Keep the articles tagged for a site. Pass `type` to also restrict to news,
 * user stories, or tech blogs.
 */
export function filterArticles(articles: BackendArticle[], publish_on: website, type?: article_type): BackendArticle[]{
	return articles.filter((x: BackendArticle) =>
			x?.publish_on && x.publish_on.includes(publish_on) && (type === undefined || x.type == type)
	)
}

export default filterArticles
