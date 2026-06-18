import {Typography, Box, Container} from '@mui/material';
import Balancer from "react-wrap-balancer";

import {BackendArticle} from '../types'
import MarkdownContent from "../markdownComponents/MarkdownContent";

const Article = ({article}: {article: BackendArticle}) => {
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
							<Typography variant={"h5"}>{article.date.toLocaleDateString()}</Typography>
						</Box>
					</Box>
					<MarkdownContent>
						{article.content}
					</MarkdownContent>
				</Box>
			</Container>
	)
}

export default Article;
