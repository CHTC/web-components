import type { Website } from "../../types";
import type { ArticleType, BackendArticle } from "../types";

/**
 * Keep the articles tagged for a site. Pass `type` to also restrict to news,
 * user stories, or tech blogs.
 */
export function filterArticles(
  articles: BackendArticle[],
  publish_on: Website,
  type?: ArticleType
): BackendArticle[] {
  return articles.filter(
    (article) =>
      article?.publish_on?.includes(publish_on) &&
      (type === undefined || article.type === type)
  );
}

export default filterArticles;
