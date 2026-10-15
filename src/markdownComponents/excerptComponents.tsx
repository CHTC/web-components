import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import type { Components } from "react-markdown";
import markdownComponents from "./markdownComponents";

/** Every block in an excerpt renders at body size, headings included. */
const excerptBlock =
  (variant: "body1" | "body2"): Components["p"] =>
  ({ children, node, ...props }) => (
    <Typography
      variant={variant}
      component="div"
      // Space between paragraphs, but nothing trailing: a bottom margin on the
      // last block would push the card's own padding open.
      sx={{ "&:not(:last-child)": { mb: 1 } }}
      {...props}
    >
      {children}
    </Typography>
  );

/**
 * Markdown components for the short excerpt shown on an article card.
 *
 * Card excerpts are a fixed, small block of text, so the block-level structure
 * of the full article map is flattened: a stray heading in an excerpt renders
 * at body size rather than blowing out the card.
 *
 * Links take the theme's body text color (`palette.text.primary`) and carry no
 * underline, so a link in an excerpt reads as ordinary text rather than
 * pulling the eye away from the card's title.
 */
/**
 * The excerpt map at a given body size.
 *
 * Cards do not all set their excerpt at the same size — an article card uses
 * `body1`, an event card `body2` — and the size has to reach every block the
 * markdown produces, not just the first paragraph, or a two-paragraph excerpt
 * changes size halfway down.
 */
export function createExcerptComponents(
  variant: "body1" | "body2" = "body1"
): Components {
  const Block = excerptBlock(variant);
  return {
    ...markdownComponents,
    a: ({ node, ...props }) => (
      <MuiLink underline="none" sx={{ color: "text.primary" }} {...props} />
    ),
    p: Block,
    h1: Block,
    h2: Block,
    h3: Block,
    h4: Block,
    h5: Block,
    h6: Block,
  };
}

const excerptComponents: Components = createExcerptComponents();

/**
 * The same map for an excerpt that sits *inside* a card-wide link.
 *
 * A nested `<a>` is invalid HTML — the browser's parser closes the outer
 * anchor and hoists the inner one out, which tears the card's markup apart on
 * hydration. Links in the excerpt therefore render as plain spans — same text
 * color, no underline — and the card as a whole navigates to the article.
 */
export const linkedCardExcerptComponents: Components = {
  ...excerptComponents,
  a: ({ children, href, node, ...props }) => (
    <Box component="span" {...props}>
      {children}
    </Box>
  ),
};

export default excerptComponents;
