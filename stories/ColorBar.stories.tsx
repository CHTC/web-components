import type { Meta, StoryObj } from "@storybook/nextjs";

import DowntimeBar from '../src/ColorBar';

const defaultDowntimeData = [true, false, true, false, true, false, true, false, true, false];

const meta: Meta<typeof DowntimeBar> = {
	title: 'Components/Status/ColorBar',
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
		data: defaultDowntimeData
	},
};

export const CustomColors: Story = {
	args: {
		data: defaultDowntimeData,
		red: "#FFFFFF",
		green: "#000000"
	},
}

export const ManySegments: Story = {
	args: {
		data: Array.from({ length:7 }, () => Math.random() >= 0.5)
	},
}

export const DefinedSVGProps: Story = {
	args: {
		data: defaultDowntimeData,
		width: 100,
		height: 100
	},
}

export const UndefinedValues: Story = {
	args: {
		data: [true, false, undefined, true, false, undefined, true, false, undefined, true]
	},
}

export const ObjectData: Story = {
	args: {
		data: [
			{ title: "First", fill: "red", width: 10, x: 0 },
			{ title: "Second", fill: "green", width: 20, x: 10 },
			{ title: "Third", fill: "blue", width: 30, x: 30, onClick: () => alert("Clicked!") },
		]
	},
}

export const ObjectDataLowLevelValues: Story = {
	args: {
		data: [
			{ title: "First", fill: "red", width: 10, x: 0 },
			{ title: "Second", fill: "blue", width: 1, x: 40 },
			{ title: "Overlap", fill: "green", width: 2, x: 5 }
		]
	}
}