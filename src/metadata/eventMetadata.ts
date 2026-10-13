import type { Metadata } from "next";

import type { BackendEvent } from "../Event/types";
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
 * Next.js metadata for one event's page.
 *
 * The card image is preferred over the banner: it is the 2:1 crop, which is
 * the shape link previews want.
 *
 * Only the start date is published. `expirationTime` would declare the *page*
 * out of date once the event ends, and a past event's page is a valid archive
 * that should still preview.
 */
export function eventMetadata(
  event: BackendEvent,
  { path, site }: ContentMetadataOptions
): Metadata {
  const title = pageTitle(event.title, site);
  const description = summarize(event.excerpt);
  const art = event.image ?? event.banner;
  const images = shareImages(art?.path, art?.alt, site);

  return {
    title,
    description,
    keywords: event.tags,
    alternates: { canonical: path },
    openGraph: {
      ...openGraphDefaults(site),
      type: "article",
      title,
      description,
      url: path,
      publishedTime: isoDate(event.start_date),
      images,
    },
    twitter: { ...twitterDefaults, title, description, images },
  };
}

export default eventMetadata;
