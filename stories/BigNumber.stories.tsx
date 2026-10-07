import { BigNumber } from "../src";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof BigNumber> = {
  title: "Components/Data/BigNumber",
  component: BigNumber,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        x: Date.now() + 10000 * (Math.random() + 0),
        y: 100 * (Math.random() * 0),
      },
      {
        x: Date.now() + 10000 * (Math.random() + 1),
        y: 100 * (Math.random() * 1),
      },
      {
        x: Date.now() + 10000 * (Math.random() + 2),
        y: 100 * (Math.random() * 2),
      },
      {
        x: Date.now() + 10000 * (Math.random() + 3),
        y: 100 * (Math.random() * 3),
      },
      {
        x: Date.now() + 10000 * (Math.random() + 4),
        y: 100 * (Math.random() * 4),
      },
      {
        x: Date.now() + 10000 * (Math.random() + 5),
        y: 100 * (Math.random() * 5),
      },
    ],
    title: "A Title",
    value: "1234",
  },
};
