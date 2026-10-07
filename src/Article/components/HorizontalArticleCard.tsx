import {Grid, Typography, Box} from '@mui/material';
import Balancer from "react-wrap-balancer";

import TopStyledBlock from "../../TopStyledBlock";
import Link from "next/link";
import {ArrowRight} from "@mui/icons-material";
import {ArticleCardProps} from "../types";

const HorizontalArticleCard = ({href, article} : ArticleCardProps) => {
	return (
			<Box sx={{ display: { xs: 'none', md: 'block' } }}>
				<Grid container>
					<Grid size={6}>
						<img style={{objectFit: "cover", width: "100%", height: "100%", aspectRatio: 2}} src={article.image.path} alt={article.image.alt} />
					</Grid>
					<Grid size={6} display={"flex"}>
						<Box width={"100%"} pl={2} p={3} display={"flex"} flexDirection={"column"} bgcolor={"#cfe4ff52"}>
							<Box py={1}>
								<TopStyledBlock height={".25rem"} width={"5rem"} offset={"-.75rem"}>
									<Typography variant={"h5"}><Balancer>{article.title}</Balancer></Typography>
								</TopStyledBlock>
							</Box>
							<Typography variant={"body1"}>{article.excerpt}</Typography>
							<Box sx={{marginTop: "auto", paddingTop: "2rem", fontWeight: "300"}}>
								<Box sx={{color: "#0885ff"}}>
									<Link href={href}>
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
