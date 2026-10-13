import type { Metadata } from "next";

import type { BackendArticle } from "../Article/types";
import { firstParagraph } from "../utils/firstParagraph";
import { isoDate } from "../utils/isoDate";
import { summarize } from "../utils/summarize";
import {
  openGraphDefaults,
  pageTitle,
  shareImages,
  twitterDefaults,
} from "./shared";
import type { ContentMetadataOptions } from "./types";

/**
 * Next.js metadata for one article's page.
 *
 * Draws on frontmatter the repository already carries: the excerpt becomes
 * the description, falling back to the body's opening paragraph for the
 * articles that have none; the card image becomes the shared image; and
 * `canonical_url` becomes the canonical link, naming wherever the
 * authoritative copy lives — another site for anything syndicated, this page
 * itself otherwise.
 */
export function articleMetadata(
  article: BackendArticle,
  { path, site }: ContentMetadataOptions
): Metadata {
  const title = pageTitle(article.title, site);
  const description = summarize(article.excerpt) ?? firstParagraph(article.content);
  const images = shareImages(article.image?.path, article.image?.alt, site);

  return {
    title,
    description,
    authors: article.author ? [{ name: article.author }] : undefined,
    keywords: article.tag,
    alternates: { canonical: article.canonical_url ?? path },
    openGraph: {
      ...openGraphDefaults(site),
      type: "article",
      title,
      description,
      // The page's own address, even when the canonical points off-site: a
      // share of this URL should resolve to the page that was shared.
      url: path,
      publishedTime: isoDate(article.date),
      authors: article.author ? [article.author] : undefined,
      images,
    },
    twitter: { ...twitterDefaults, title, description, images },
  };
}

export default articleMetadata;
