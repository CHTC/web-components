import type { ComponentType, ImgHTMLAttributes } from "react";

/**
 * The props the library hands to whatever component renders its images.
 *
 * Deliberately the intersection of a plain `<img>` and `next/image`:
 * `src`/`alt` plus intrinsic `width`/`height` as numbers and a `sizes` hint.
 * A plain `<img>` treats the dimensions as the attributes they already are;
 * `next/image` and `next-image-export-optimizer` use them to build a srcset.
 */
export type SiteImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "width" | "height"
> & {
  src: string;
  alt: string;
  /** Intrinsic width in pixels. Required by `next/image`-shaped components. */
  width: number;
  /** Intrinsic height in pixels. Required by `next/image`-shaped components. */
  height: number;
  /** Responsive-selection hint, e.g. `(max-width: 900px) 100vw, 400px`. */
  sizes?: string;
};

/**
 * A drop-in replacement for the `<img>` tags the library renders.
 *
 * Sites that optimize their images pass one in — `next/image`, or
 * `next-image-export-optimizer`'s `ExportedImage` on a statically exported
 * site. Everything else gets {@link DefaultImageComponent}.
 */
export type SiteImageComponent = ComponentType<SiteImageProps>;
