/** An image offered to Open Graph and Twitter. */
export interface ShareImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

/**
 * The parts of a site's identity the content metadata builders cannot infer.
 *
 * Supplied per site rather than read from the environment, so the library
 * never depends on a particular variable being set during a build.
 */
export interface SiteMetadata {
  /** `og:site_name`, and the suffix appended to page titles by default. */
  siteName: string;
  /** `og:locale`. Defaults to `en_US`. */
  locale?: string;
  /**
   * Shown when the content carries no image of its own. Without it, such a
   * page gets no image at all — see the note in `openGraphDefaults`.
   */
  fallbackImage?: ShareImage;
  /**
   * How a content title becomes a page title. Defaults to
   * `` `${title} — ${siteName}` ``.
   */
  formatTitle?: (title: string, siteName: string) => string;
}

/** Where the page being described lives, and which site is describing it. */
export interface ContentMetadataOptions {
  /** The page's own path or absolute URL, e.g. `/news/2026/10/06/some-title/`. */
  path: string;
  site: SiteMetadata;
}
