import type { Meta, StoryObj } from "@storybook/nextjs";

import DowntimeBar from '../src/TimeBar';

const meta: Meta<typeof DowntimeBar> = {
	title: 'Components/Status/TimeBar',
	component: DowntimeBar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		points: [
			{fill: "black", value: 1738858883, title: "Outage", onClick: (x) => alert(`Point Clicked!${x.value}`)}
		],
		ranges: [
			{fill: "#befbc2", start: 1738858883 - 3000, end: 1738858883, title: "Recovery"},
			{fill: "red", start: 1738858883 - 6000, end: 1738858883 - 3000, title: "Outage"},
			{fill: "green", start: 1738858883, end: 1738858883 + 6000, title: "Operational", onClick: (x) => alert(`Range Clicked!${x.start}-${x.end}`)},
		]
	},
};

