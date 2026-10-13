import {Grid, Typography, Box} from '@mui/material';
import Balancer from "react-wrap-balancer";

import TopStyledBlock from "../../TopStyledBlock";
import MarkdownContent from "../../markdownComponents/MarkdownContent";
import excerptComponents from "../../markdownComponents/excerptComponents";
import Link from "next/link";
import {ArrowRight} from "@mui/icons-material";
import {ArticleCardProps} from "../types";
import DefaultImageComponent from "../../images/DefaultImageComponent";

/* Half the viewport, and only ever rendered at `md` and up. */
const BANNER_IMAGE_WIDTH = 1600;
const BANNER_IMAGE_HEIGHT = 800;
const BANNER_IMAGE_SIZES = "50vw";

const HorizontalArticleCard = ({href, article, imageComponent: ImageComponent = DefaultImageComponent} : ArticleCardProps) => {
	return (
			<Box sx={{ display: { xs: 'none', md: 'block' } }}>
				<Grid container>
					<Grid size={6}>
						<ImageComponent
							src={article.image.path}
							alt={article.image.alt}
							width={BANNER_IMAGE_WIDTH}
							height={BANNER_IMAGE_HEIGHT}
							sizes={BANNER_IMAGE_SIZES}
							style={{objectFit: "cover", width: "100%", height: "100%", aspectRatio: 2}}
						/>
					</Grid>
					<Grid size={6} display={"flex"}>
						<Box width={"100%"} pl={2} p={3} display={"flex"} flexDirection={"column"} bgcolor={"#cfe4ff52"}>
							<Box py={1}>
								<TopStyledBlock height={".25rem"} width={"5rem"} offset={"-.75rem"}>
									<Typography variant={"h5"}><Balancer>{article.title}</Balancer></Typography>
								</TopStyledBlock>
							</Box>
							{/* The excerpt sits outside the card's anchor here, so links
							    in it can stay real links. */}
							<MarkdownContent components={excerptComponents}>
								{article.excerpt}
							</MarkdownContent>
							<Box sx={{marginTop: "auto", paddingTop: "2rem", fontWeight: "300"}}>
								<Box sx={{color: "#0885ff"}}>
									<Link href={href} style={{color: "inherit", textDecoration: "none"}}>
										<Typography variant={"body1"} sx={{display: "inline", paddingRight: ".2rem"}}>
											Read More
										</Typography>
										<ArrowRight height={18} width={24} fill={"currentColor"}/>
									</Link>
								</Box>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
	)
}

export default HorizontalArticleCard;
