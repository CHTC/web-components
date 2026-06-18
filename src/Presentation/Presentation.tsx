import { Box, Chip, Container, Link, Stack, Typography } from "@mui/material";
import Balancer from "react-wrap-balancer";
import MarkdownContent from "../markdownComponents/MarkdownContent";
import { Presentation as PresentationType } from "../types";
import { getTagColor } from "../utils/tagColor";
import { formatLongDate } from "../utils/formatDate";

const Presentation = ({
  title,
  presenter,
  event,
  date,
  description,
  youtubeId,
  keywords = [],
  links = [],
}: PresentationType) => {
  const formattedDate = formatLongDate(date);

  return (
    <Container maxWidth={"md"}>
      <Box pt={6}>
        <Box textAlign={"center"} pb={2}>
          <Box pb={6}>
            <Typography variant={"h3"}>
              <Balancer>{title}</Balancer>
            </Typography>
          </Box>
          <Box
            height={"1rem"}
            borderRadius={"10px"}
            bgcolor={"primary.main"}
          ></Box>
          <Box pt={1} display={"flex"} justifyContent={"space-between"}>
            <Typography variant={"h5"}>
              {presenter} {event && `at ${event}`}
            </Typography>
            <Typography variant={"h5"}>{formattedDate}</Typography>
          </Box>
        </Box>

        {youtubeId && (
          <Box display={"flex"} justifyContent={"center"} pb={2}>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}`}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "640px",
                aspectRatio: "16/9",
              }}
              allowFullScreen
            ></iframe>
          </Box>
        )}

				{ description && (
					<MarkdownContent>
						{description}
					</MarkdownContent>
				)}

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

        {links.length !== 0 && (
          <>
            <Typography variant="h5" mt={4}>
              Associated Links
            </Typography>

            <Box paddingLeft="40px" mt={0} component="ul">
              {links.map((link) => (
                <Box key={link.name} component="li">
                  <Link href={link.value} target="_blank">
                    {link.name}
                  </Link>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Presentation;
