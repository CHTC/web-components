import type { SiteImageComponent } from "../images/types";
import type { Website } from "../types";

/** An image attached to an event, as named in frontmatter. */
export interface EventImage {
  path: string;
  alt: string;
  /** Attribution line shown beneath a banner. */
  credit?: string;
}

/**
 * An event from the shared CHTC/events repository. Field names mirror the
 * markdown frontmatter documented in that repository's README.
 */
export interface EventData {
  title: string;
  /** Shorter title for places a full one does not fit, such as a calendar. */
  short_title?: string;
  /** Defaults to true when absent. */
  published?: boolean;
  /** `YYYY-MM-DD`. Normalized from frontmatter, which may give a YAML date. */
  start_date: string;
  /** `YYYY-MM-DD`. Equal to `start_date` for a single-day event. */
  end_date: string;
  /** Sites this event should appear on. Always an array. */
  publish_on: Website[];
  tags?: string[];
  excerpt?: string;
  /** Card art. A 2:1 crop, which is also the shape link previews want. */
  image?: EventImage;
  /** Wide art for the top of the event's own page. */
  banner?: EventImage;
  /** Markdown rendered beside the body, typically the practical details. */
  sidebar?: string;
  /** Markdown rendered full width beneath the body. */
  endblock?: string;
  /** Markdown body with the frontmatter removed. */
  content: string;
}

/** An event plus the fields derived from its location in the repository. */
export interface BackendEvent extends EventData {
  slug: string[];
  path: string;
}

export interface EventCardProps {
  href: string;
  event: BackendEvent;
  /**
   * Component rendered for the card's image. Defaults to a plain `<img>`;
   * pass `next/image` or `ExportedImage` to have it optimized.
   */
  imageComponent?: SiteImageComponent;
}
