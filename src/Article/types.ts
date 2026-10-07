import type { Website } from "../types";

export type ArticleTag = "chtc_featured_article";
export type ArticleType = "news" | "user" | "tech-blog";

export interface ArticleImage {
  path: string;
  alt: string;
}

/**
 * An article from the shared CHTC/Articles repository. Field names mirror the
 * markdown frontmatter documented in that repository's README.
 */
export interface ArticleData {
  /** Markdown body with the frontmatter removed. */
  content: string;
  title: string;
  author?: string;
  /** Parsed from the `YYYY-MM-DD-` prefix of the file name. */
  date: Date;
  /** Sites this article should appear on. Always an array, even if the frontmatter gave a single value. */
  publish_on: Website[];
  type: ArticleType;
  /** Always an array, even if the frontmatter gave a single value. */
  tag?: ArticleTag[];
  image: ArticleImage;
  excerpt?: string;
  banner_src?: string;
  banner_alt?: string;
  /** Absolute URL of the canonical copy, for `<link rel="canonical">` and attribution. */
  canonical_url?: string;
}

/** An article plus the fields derived from its location in the repository. */
export interface BackendArticle extends ArticleData {
  slug: string[];
  path: string;
}

export interface ArticleCardProps {
  href: string;
  article: BackendArticle;
}
