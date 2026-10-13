import {Typography, Box, Container} from '@mui/material';
import Balancer from "react-wrap-balancer";

import {BackendArticle} from '../types'
import MarkdownContent from "../../markdownComponents/MarkdownContent";
import {formatLongDate} from "../../utils/formatLongDate";
import type {SiteImageComponent} from "../../images/types";

interface ArticleProps {
	article: BackendArticle;
	/**
	 * Component rendered for images in the article body. Defaults to a plain
	 * `<img>`; pass `next/image` or `ExportedImage` to have them optimized.
	 */
	imageComponent?: SiteImageComponent;
}

/* The body sits in a `maxWidth="md"` container, so 900px is its widest. */
const BODY_IMAGE_SIZES = "(max-width: 900px) 100vw, 900px";

const Article = ({article, imageComponent}: ArticleProps) => {
	return (
			<Container maxWidth={"md"}>
				<Box pt={6}>
					<Box textAlign={"center"} pb={2}>
						<Box pb={6}>
							<Typography variant={"h3"} ><Balancer>{article.title}</Balancer></Typography>
						</Box>
						<Box height={"1rem"} borderRadius={"10px"} bgcolor={"primary.main"}></Box>
						<Box pt={1} display={"flex"} justifyContent={"space-between"}>
							<Typography variant={"h5"}>{article.author}</Typography>
							<Typography variant={"h5"}>{formatLongDate(article.date)}</Typography>
						</Box>
					</Box>
					<MarkdownContent imageComponent={imageComponent} imageSizes={BODY_IMAGE_SIZES}>
						{article.content}
					</MarkdownContent>
				</Box>
			</Container>
	)
}

export default Article;
