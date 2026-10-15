import { Card, CardContent, Divider, Typography } from "@mui/material";
import Link from "next/link";

import DefaultImageComponent from "../../images/DefaultImageComponent";
import MarkdownContent from "../../markdownComponents/MarkdownContent";
import { createExcerptComponents } from "../../markdownComponents/excerptComponents";
import type { EventCardProps } from "../types";
import { formatEventDate } from "../utils/formatEventDate";

/*
 * The card art is a 2:1 crop. The dimensions are the intrinsic size an
 * optimizing image component needs to build a srcset — the rendered size
 * comes from the CSS below, and `sizes` tells the browser what that will be
 * before any layout has happened.
 */
const CARD_IMAGE_WIDTH = 1200;
const CARD_IMAGE_HEIGHT = 600;
/** One per row below `sm`, two up to `lg`, then three in an `xl` container. */
const CARD_IMAGE_SIZES =
  "(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 500px";

/*
 * Excerpts are markdown, the same as an article's: the content repositories
 * use the same frontmatter convention for both, and some carry links. At
 * `body2`, matching the size this card used when the excerpt was plain text.
 */
const EXCERPT_COMPONENTS = createExcerptComponents("body2");

const EventCard = ({
  href,
  event,
  imageComponent: ImageComponent = DefaultImageComponent,
}: EventCardProps) => {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: 0,
        transition: "box-shadow 200ms",
        "&:hover": { boxShadow: 4 },
      }}
    >
      {event.image && (
        <Link href={href} style={{ display: "block" }}>
          <ImageComponent
            src={event.image.path}
            alt={event.image.alt}
            width={CARD_IMAGE_WIDTH}
            height={CARD_IMAGE_HEIGHT}
            sizes={CARD_IMAGE_SIZES}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "auto",
              aspectRatio: 2,
            }}
          />
        </Link>
      )}
      <CardContent sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Link href={href} style={{ textDecoration: "none" }}>
          <Typography variant="h5" color="primary.dark">
            {event.title}
          </Typography>
        </Link>
        <Typography variant="subtitle2" color="text.secondary">
          {formatEventDate(event.start_date, event.end_date)}
        </Typography>
        {event.excerpt && (
          <>
            <Divider sx={{ my: 1 }} />
            <MarkdownContent components={EXCERPT_COMPONENTS}>
              {event.excerpt}
            </MarkdownContent>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;
