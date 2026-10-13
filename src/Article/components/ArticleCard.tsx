import {Typography, Box} from '@mui/material';
import Balancer from "react-wrap-balancer";
import {ArticleCardProps} from "../types";
import Link from "next/link";
import TopStyledBlock from "../../TopStyledBlock";
import MarkdownContent from "../../markdownComponents/MarkdownContent";
import {linkedCardExcerptComponents} from "../../markdownComponents/excerptComponents";
import DefaultImageComponent from "../../images/DefaultImageComponent";

/*
 * The card art is a 2:1 crop. The numbers below are the intrinsic size an
 * optimizing image component needs to build a srcset — the rendered size comes
 * from the CSS width below, and `sizes` tells the browser what that width will
 * be before any layout has happened.
 */
const CARD_IMAGE_WIDTH = 1200;
const CARD_IMAGE_HEIGHT = 600;
/** One per row below `md`, two up to `lg`, then three in an `xl` container. */
const CARD_IMAGE_SIZES = "(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 500px";

const ArticleCard = ({href, article, imageComponent: ImageComponent = DefaultImageComponent} : ArticleCardProps) => {

	const style = {
		transition: "box-shadow .2s",
		boxShadow: "grey 1px 1px 3px",
		"&:hover": {boxShadow: "grey 1px 1px 5px"},
	}

	return (
			<Box borderRadius={2} overflow={"hidden"} sx={style}>
				{/* The whole card is the link. `inherit` picks up the theme's body
				    text color from the cascade rather than the browser's link blue,
				    visited purple and underline. */}
				<Link href={href} style={{color: "inherit", textDecoration: "none"}}>
					<Box>
						<ImageComponent
							src={article.image.path}
							alt={article.image.alt}
							width={CARD_IMAGE_WIDTH}
							height={CARD_IMAGE_HEIGHT}
							sizes={CARD_IMAGE_SIZES}
							style={{objectFit: "cover", width: "100%", height: "auto", aspectRatio: 2}}
						/>
					</Box>
					<Box>
						<Box pl={2} p={2}>
							<Box py={1} pt={1}>
								<TopStyledBlock height={".25rem"} width={"5rem"} offset={"-.75rem"}>
									<Typography variant={"h6"} sx={{fontWeight: "bold"}}><Balancer>{article.title}</Balancer></Typography>
								</TopStyledBlock>
							</Box>
							<MarkdownContent components={linkedCardExcerptComponents}>
								{article.excerpt}
							</MarkdownContent>
						</Box>
					</Box>
				</Link>
			</Box>
	)
}

export default ArticleCard;
