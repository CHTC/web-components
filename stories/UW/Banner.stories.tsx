import type { Meta, StoryObj } from "@storybook/nextjs";
import Banner from '../../src/UW/Banner';

const meta: Meta<typeof Banner> = {
	title: 'Components/UW/Banner',
	component: Banner,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};