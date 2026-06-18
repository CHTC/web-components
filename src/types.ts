export * from "./TimeBar";

/**
 * Article Types
 */

export interface ArticleCardProps {
  href: string;
  article: BackendArticle;
}

export type website = "htcondor" | "path" | "osg" | "chtc" | "pelican";
export type tag = "chtc_featured_article";
export type article_type = "news" | "user";

export interface Image {
  path: string;
  alt: string;
}

export interface Article {
  content: string;
  title: string;
  author: string;
  date: Date;
  publish_on: website[];
  type: article_type;
  tag: tag;
  image: Image;
  excerpt?: string;
  banner_src?: string;
  banner_alt?: string;
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
