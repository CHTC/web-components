import defaultArticle from "./Article";
import {BackendArticle} from "../../src/Article/types";

const defaultBackendArticle: BackendArticle = {
	slug: ['sample-article'],
	path: '2021-10-01-sample-article.md',
	...defaultArticle
}

export default defaultBackendArticle;
