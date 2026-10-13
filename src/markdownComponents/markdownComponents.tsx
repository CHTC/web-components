import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import type { Components } from "react-markdown";
import DefaultImageComponent from "../images/DefaultImageComponent";
import type { SiteImageComponent } from "../images/types";

/*
 * react-markdown hands every component the mdast `node` it came from. It is
 * useful for inspecting the source tree, but it is not a DOM attribute, and
 * MUI forwards unknown props straight through — so leaving it in the spread
 * stamps `node="[object Object]"` onto the rendered element. Every component
 * below drops it before spreading the rest.
 */

const baseComponents: Components = {
  h1: ({ children, node, ...props }) => {
    return (
      <Typography component={"h1"} variant="h4" gutterBottom {...props}>
        {children}
      </Typography>
    );
  },
  h2: ({ children, node, ...props }) => {
    return (
      <Typography component={"h2"} variant="h5" gutterBottom {...props}>
        {children}
      </Typography>
    );
  },
  h3: ({ children, node, ...props }) => {
    return (
      <Typography component={"h3"} variant="h6" gutterBottom {...props}>
        {children}
      </Typography>
    );
  },
  h4: ({ children, node, ...props }) => {
    return (
      <Typography
        component={"h4"}
        variant="h6"
        fontWeight={400}
        borderBottom={"black solid 1px"}
        gutterBottom
        {...props}
      >
        {children}
      </Typography>
    );
  },
  h5: ({ children, node, ...props }) => {
    return (
      <Typography
        component={"h5"}
        variant="h6"
        fontWeight={300}
        gutterBottom
        {...props}
      >
        {children}
      </Typography>
    );
  },
  h6: ({ children, node, ...props }) => {
    return (
      <Typography
        component={"h6"}
        variant="h6"
        fontWeight={300}
        color={"primary.main"}
        gutterBottom
        {...props}
      >
        {children}
      </Typography>
    );
  },
  p: ({ node, ...props }) => (
    <Typography variant="body1" component={"div"} gutterBottom {...props} />
  ), // use sx for spacing
  a: ({ node, ...props }) => <MuiLink {...props} />,
  ul: ({ node, ...props }) => (
    <Box component="ul" sx={{ pl: 4, mb: 2 }} {...props} />
  ),
  ol: ({ node, ...props }) => (
    <Box component="ol" sx={{ pl: 4, mb: 2 }} {...props} />
  ),
  li: ({ node, ...props }) => (
    <Box component="li" sx={{ mb: 0.5 }} {...props} />
  ),
  blockquote: ({ node, ...props }) => (
    <Box
      component="blockquote"
      sx={{
        borderLeft: 4,
        borderColor: "grey.300",
        pl: 2,
        ml: 0,
        my: 2,
        color: "grey.700",
        fontStyle: "italic",
      }}
      {...props}
    />
  ),
  code: ({ children, node, ...props }) => {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.0/styles/github.min.css"
        />
        <Box
          component="code"
          sx={{
            bgcolor: "grey.100",
            py: 0.2,
            borderRadius: 1,
            fontFamily: "monospace",
            fontSize: "0.95em",
          }}
          {...props}
        >
          {children}
        </Box>
      </>
    );
  },
  pre: ({ node, ...props }) => (
    <Box
      component="pre"
      sx={{
        bgcolor: "grey.100",
        p: 2,
        borderRadius: 2,
        overflow: "auto",
        mb: 2,
      }}
      {...props}
    />
  ),
};

export interface MarkdownComponentOptions {
  /**
   * Component rendered for every image in the markdown. Defaults to a plain
   * `<img>`; pass `next/image` or `ExportedImage` to have them optimized.
   */
  imageComponent?: SiteImageComponent;
  /** `sizes` hint forwarded to {@link MarkdownComponentOptions.imageComponent}. */
  imageSizes?: string;
}

/*
 * Markdown bodies come from the content repositories as raw HTML, and most of
 * their `<img>` tags declare no dimensions. `next/image`-shaped components
 * require both, and use them only for the aspect ratio of the placeholder and
 * to cap the srcset — the rendered size comes from the CSS below. So an
 * assumed landscape ratio is safe: a wrong guess costs a little layout shift
 * on load, not a wrongly sized image.
 */
const FALLBACK_IMAGE_WIDTH = 1200;
const FALLBACK_IMAGE_HEIGHT = 800;

/** Parse an HTML dimension attribute, which arrives as a string. */
const toPixels = (value: unknown): number | undefined => {
  const parsed =
    typeof value === "number" ? value : Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
};

/**
 * Build the component map react-markdown renders with.
 *
 * Everything but images is fixed; images are pluggable because optimizing them
 * needs a framework component the library cannot depend on.
 */
export const createMarkdownComponents = ({
  imageComponent: ImageComponent = DefaultImageComponent,
  imageSizes,
}: MarkdownComponentOptions = {}): Components => ({
  ...baseComponents,
  img: ({ node, src, alt, width, height, style, ...props }) => {
    // A missing or non-string src is not something an image component can be
    // handed; drop the image rather than render a broken one.
    if (typeof src !== "string" || src === "") return null;

    const declaredWidth = toPixels(width);
    const declaredHeight = toPixels(height);

    return (
      <ImageComponent
        {...props}
        src={src}
        alt={alt ?? ""}
        width={declaredWidth ?? FALLBACK_IMAGE_WIDTH}
        height={declaredHeight ?? FALLBACK_IMAGE_HEIGHT}
        sizes={imageSizes}
        style={{
          maxWidth: "100%",
          // Both dimensions are set, so a component that warns about a
          // half-constrained image stays quiet, and the intrinsic ratio above
          // never overrides the real one.
          width: declaredWidth ? `${declaredWidth}px` : undefined,
          height: "auto",
          marginTop: 2,
          marginBottom: 2,
          ...style,
        }}
      />
    );
  },
});

const markdownComponents = createMarkdownComponents();

export default markdownComponents;
