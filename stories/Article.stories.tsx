import type { Meta, StoryObj } from "@storybook/nextjs";
import { Article } from '../src';
import defaultBackendArticle from "./mockData/BackendArticle";

const meta: Meta<typeof Article> = {
	title: 'Components/Article/Article',
	component: Article,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		article: defaultBackendArticle,
	},
};