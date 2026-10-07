import type { Meta, StoryObj } from "@storybook/nextjs";
import { StaffCard } from "../src";
import { defaultStaff, defaultLeader } from "./mockData/StaffCard";

const meta: Meta<typeof StaffCard> = {
  title: "Components/StaffCard",
  component: StaffCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Staff: Story = {
  args: {
    type: "staff",
    ...defaultStaff,
  },
};

export const Leader: Story = {
  args: {
    type: "leader",
    ...defaultLeader,
  },
};

export const LeaderLarger: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    type: "leader",
    ...defaultLeader,
    image: "https://placehold.co/300x300",
  },
};
