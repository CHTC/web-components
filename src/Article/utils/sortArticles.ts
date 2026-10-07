import type { BackendArticle } from "../types";

/** Newest first, by the date in the file name. */
export function sortArticles(articles: BackendArticle[]): BackendArticle[] {
  return [...articles].sort(
    (a, b) => b.date.getTime() - a.date.getTime() || b.path.localeCompare(a.path)
  );
}

export default sortArticles;
