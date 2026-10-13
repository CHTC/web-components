import type { SiteImageProps } from "./types";

/**
 * The plain `<img>` the library falls back to when a site has not supplied an
 * `imageComponent`. Keeps the default behaviour of every consumer unchanged.
 */
const DefaultImageComponent = ({ sizes, ...props }: SiteImageProps) => (
  // `sizes` without a `srcset` means nothing to a plain <img>, so it is
  // dropped rather than emitted as a dead attribute.
  // eslint-disable-next-line @next/next/no-img-element
  <img {...props} />
);

export default DefaultImageComponent;
