import type { Website } from "../types";

/**
 * A presentation from the shared presentations repository.
 *
 * Every field is optional in the source markdown, so parsers must not assume
 * a key is present. A single presentation with missing frontmatter used to
 * throw and take a whole static export down with it.
 */
export interface PresentationData {
  title: string;
  presenter: string;
  event?: string;
  date: string;
  /** Sites this presentation should appear on. */
  publish_on?: Website[];
  /** Defaults to true when absent. */
  published?: boolean;
  description?: string;
  keywords?: string[];
  links?: PresentationLink[];
  thumbnail?: {
    src: string;
    alt: string;
  };
  youtubeId?: string;
}

export interface PresentationLink {
  name: string;
  value: string;
}

/** A presentation plus the fields derived from its location in the repository. */
export interface BackendPresentation extends PresentationData {
  slug: string[];
  path: string;
}
