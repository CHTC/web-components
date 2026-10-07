import type { Meta, StoryObj } from '@storybook/react';

import HorizontalArticleCard from '../src/Article/components/HorizontalArticleCard';
import defaultBackendArticle from "./mockData/BackendArticle";

const meta: Meta<typeof HorizontalArticleCard> = {
	title: 'Components/Article/HorizontalArticleCard',
	component: HorizontalArticleCard,
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
