import {Typography, Box} from '@mui/material';
import Balancer from "react-wrap-balancer";
import {ArticleCardProps} from "../types";
import Link from "next/link";
import TopStyledBlock from "../../TopStyledBlock";
import MarkdownContent from "../../markdownComponents/MarkdownContent";
import {linkedCardExcerptComponents} from "../../markdownComponents/excerptComponents";

const ArticleCard = ({href, article} : ArticleCardProps) => {

	const style = {
		transition: "box-shadow .2s",
		boxShadow: "grey 1px 1px 3px",
		"&:hover": {boxShadow: "grey 1px 1px 5px"},
	}

	return (
			<Box borderRadius={2} overflow={"hidden"} sx={style}>
				{/* The whole card is the link, so it takes the theme's body text color
				    rather than the browser's link blue, visited purple and underline. */}
				<Box component={Link} href={href} sx={{color: "text.primary", textDecoration: "none"}}>
					<Box>
						<img style={{objectFit: "cover", width: "100%", aspectRatio: 2}} src={article.image.path} alt={article.image.alt} />
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
				</Box>
			</Box>
	)
}

export default ArticleCard;
