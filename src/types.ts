export * from "./TimeBar";

/**
 * Article Types
 */

export interface ArticleCardProps {
  href: string;
  article: BackendArticle;
}

/** Sites an article can be syndicated to via its `publish_on` frontmatter. */
export type website = "htcondor" | "path" | "osg" | "chtc" | "pelican" | "fabaid";
export type tag = "chtc_featured_article";
export type article_type = "news" | "user" | "tech-blog";

export interface Image {
  path: string;
  alt: string;
}

/**
 * An article from the shared CHTC/Articles repository. Field names mirror the
 * markdown frontmatter documented in that repository's README.
 */
export interface Article {
  /** Markdown body with the frontmatter removed. */
  content: string;
  title: string;
  author?: string;
  /** Parsed from the `YYYY-MM-DD-` prefix of the file name. */
  date: Date;
  /** Sites this article should appear on. Always an array, even if the frontmatter gave a single value. */
  publish_on: website[];
  type: article_type;
  /** Always an array, even if the frontmatter gave a single value. */
  tag?: tag[];
  image: Image;
  excerpt?: string;
  banner_src?: string;
  banner_alt?: string;
  /** Absolute URL of the canonical copy, for `<link rel="canonical">` and attribution. */
  canonical_url?: string;
}

export interface BackendArticle extends Article {
  slug: string[];
  path: string;
}

/**
 * Presentation Types
 */

export interface Presentation {
  title: string;
  presenter: string;
  event?: string;
  date: string;
  description?: string;
  keywords?: string[];
  links?: {
    name: string;
    value: string;
  }[];

  thumbnail?: {
    src: string;
    alt: string;
  } | null;
  youtubeId?: string;
}
