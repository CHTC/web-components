import type { Meta, StoryObj } from "@storybook/nextjs";

import { PresentationCard } from "../src";
import defaultPresentation from "./mockData/Presentation";

const meta: Meta<typeof PresentationCard> = {
  title: "Components/Presentation/PresentationCard",
  component: (args) => {
    return <PresentationCard {...args} />;
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    presentation: defaultPresentation,
    href: "#",
  },
};

export const LargeWithMaxHeight: Story = {
  args: {
    ...Default.args,
    maxDescriptionHeight: "4.5em",
  },
};

export const SmallWithMaxHeight: Story = {
  args: {
    presentation: {
      ...defaultPresentation,
      description: "This is a short description.",
    },
    href: "#",
  },
};

export const CustomThumbnail: Story = {
  args: {
    presentation: {
      ...defaultPresentation,
      thumbnail: {
        src: "https://placehold.co/1280x720",
        alt: "Custom Thumbnail",
      },
    },
    href: "#",
    maxDescriptionHeight: "4.5em",
  },
};

export const SquareImage: Story = {
  args: {
    presentation: {
      ...defaultPresentation,
      thumbnail: {
        src: "https://placehold.co/1280x1280",
        alt: "Custom Thumbnail",
      },
    },
    href: "#",
    maxDescriptionHeight: "4.5em",
  },
};

export const CardSx: Story = {
  args: {
    presentation: defaultPresentation,
    href: "#",
    maxDescriptionHeight: "4.5em",
    cardSx: {
      maxWidth: 400,
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.2s",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
  },
};
