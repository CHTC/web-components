import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Link,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import MarkdownContent from "../markdownComponents/MarkdownContent";
import smallHeaderComponents from "../smallHeaderComponents/smallHeaderComponents";
import { Presentation } from "../types";
import { getTagColor } from "../utils/tagColor";
import { formatLongDate } from "../utils/formatDate";

export interface PresentationCardProps {
  presentation: Presentation;
  maxDescriptionHeight?: string | number;
  href: string;
  cardSx?: SxProps;
}

const PresentationCard = ({
  presentation: {
    title,
    presenter,
    event,
    date,
    description,
    keywords = [],
    thumbnail,
    youtubeId,
  },
  maxDescriptionHeight,
  href,
  cardSx,
}: PresentationCardProps) => {
  const [showGradient, setShowGradient] = useState(
    maxDescriptionHeight ? true : false
  );
  const descRef = useRef<HTMLDivElement>(null);

  const formattedDate = formatLongDate(date);

  function updateGradientVisibility() {
    if (descRef.current && maxDescriptionHeight) {
      const { scrollHeight, clientHeight } = descRef.current;
      setShowGradient(scrollHeight > clientHeight);
    }
  }

  useEffect(updateGradientVisibility, [description, maxDescriptionHeight]);
  useLayoutEffect(() => {
    // called on component mount, adds event listener for resize
    // ensure we only run this effect if maxDescriptionHeight is defined
    if (!maxDescriptionHeight) return;

    window.addEventListener("resize", updateGradientVisibility);
    return () => window.removeEventListener("resize", updateGradientVisibility);
  }, [maxDescriptionHeight]);

  const thumbnailSrc =
    thumbnail?.src ?? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  const thumbnailAlt = thumbnail?.alt ?? title;

  return (
    <Card sx={cardSx ?? { maxWidth: 400 }}>
      <Link href={href} underline="none" color="inherit">
        <CardMedia
          component="img"
          height="200"
          image={thumbnailSrc}
          alt={thumbnailAlt}
          sx={{ objectFit: "cover" }}
        />
      </Link>
      <CardContent>
        <Link href={href} underline="none" color="inherit">
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Link>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {event ? `${presenter} at ${event}` : presenter}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: "wrap" }}>
          {keywords.map((keyword) => (
            <Chip
              key={keyword}
              label={keyword}
              size="small"
              sx={{
                backgroundColor: getTagColor(keyword),
                color: "#fff",
                borderRadius: "0.5rem",
                fontWeight: "bold",
              }}
            />
          ))}
        </Stack>
        <div
          ref={descRef}
          style={
            showGradient && maxDescriptionHeight
              ? {
                  maxHeight: maxDescriptionHeight,
                  overflow: "hidden",
                  position: "relative",
                  userSelect: showGradient ? "none" : "auto",
                  cursor: showGradient ? "pointer" : "default",
                }
              : { position: "relative" }
          }
          onClick={() => setShowGradient(false)}
        >
          <MarkdownContent components={smallHeaderComponents}>
            {description}
          </MarkdownContent>
          {showGradient && (
            <div
              className="gradient-overlay"
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "2.2em",
                pointerEvents: "none",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.95) 80%)",
                display: showGradient ? "block" : "none",
              }}
            />
          )}
        </div>
        <Typography variant="caption" color="text.secondary" display="block">
          {formattedDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PresentationCard;
