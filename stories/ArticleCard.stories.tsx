import type { Meta, StoryObj } from "@storybook/nextjs";

import ArticleCard from '../src/Article/components/ArticleCard';
import defaultBackendArticle from "./mockData/BackendArticle";

const meta: Meta<typeof ArticleCard> = {
	title: 'Components/Article/ArticleCard',
	component: ArticleCard,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		href: "/sample-article",
		article: defaultBackendArticle
	},
};