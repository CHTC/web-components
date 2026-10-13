import type { ContentMetadataOptions, ShareImage, SiteMetadata } from "./types";

/**
 * The Open Graph fields that describe the site rather than the page.
 *
 * Next.js *replaces* the whole `openGraph` object when a page defines one; it
 * does not merge field by field, and an image coming from an
 * `opengraph-image` file goes with it. So a page that sets any Open Graph
 * field must restate all of these, which is why every builder here emits a
 * complete block rather than a partial one.
 */
export function openGraphDefaults(site: SiteMetadata) {
  return { siteName: site.siteName, locale: site.locale ?? "en_US" } as const;
}

/**
 * The same rule applies to `twitter`: a page that sets `twitter.title`
 * without restating the card type drops back to the small `summary` card.
 */
export const twitterDefaults = { card: "summary_large_image" } as const;

/** `Page Name — Site Name`, unless the site formats titles differently. */
export function pageTitle(title: string, site: SiteMetadata): string {
  return site.formatTitle
    ? site.formatTitle(title, site.siteName)
    : `${title} — ${site.siteName}`;
}

/**
 * The share image for a page: its own if it has one, the site's fallback
 * otherwise, and nothing at all if the site named no fallback.
 *
 * Never an empty array — that would override an inherited image with
 * nothing, which is worse than leaving the key off.
 */
export function shareImages(
  src: string | undefined,
  alt: string | undefined,
  site: SiteMetadata
): ShareImage[] | undefined {
  if (src) return [{ url: src, alt }];
  return site.fallbackImage ? [site.fallbackImage] : undefined;
}

export type { ContentMetadataOptions, ShareImage, SiteMetadata };
