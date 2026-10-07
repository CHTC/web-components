import type { Meta, StoryObj } from "@storybook/nextjs";
import Footer from '../../src/UW/Footer';

const meta: Meta<typeof Footer> = {
	title: 'Components/UW/Footer',
	component: Footer,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		menu: [
			{
				label: 'Home',
				items: [
					{ label: 'Main', href: '/' },
					{ label: 'About Us', href: '/about' },
					{ label: 'Contact', href: '/contact' },
				]
			},
			{
				label: 'Not Home Anymore',
				items: [
					{ label: 'Main', href: '/' },
					{ label: 'About Us', href: '/about' },
					{ label: 'Contact', href: '/contact' },
				]
			}
		],
		contact: {
			email: "demo@example.com",
			phone: "123-456-7890",
			social: {
				x: "https://x.com/demo",
				linkedin: "https://indeed.com/demo",
				instagram: "https://instagram.com/demo",
				youtube: "https://youtube.com/demo",
				facebook: "https://facebook.com/demo",
				github: "https://github.com/demo",
			}
		},
		accessibilityEmail: 'clock@wisc.edu',
	},
};