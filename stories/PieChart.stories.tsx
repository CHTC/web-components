import PieChart from "../src/PieChart";
import defaultPieChartData from "./mockData/PieChart";

import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof PieChart> = {
  title: "Components/Data/PieChart",
  component: PieChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: defaultPieChartData,
};
