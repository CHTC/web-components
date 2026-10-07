import type { Meta, StoryObj } from "@storybook/nextjs";
import { Presentation } from '../src';
import defaultPresentation from './mockData/Presentation';

const meta: Meta<typeof Presentation> = {
  title: 'Components/Presentation/Presentation',
  component: Presentation,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: defaultPresentation,
};

export const WithoutVideo: Story = {
  args: {
    ...defaultPresentation,
    thumbnail: {
      src: 'https://placehold.co/1280x720',
      alt: 'Custom Thumbnail',
    },
    youtubeId: undefined,
  },
};

export const WithoutLinks: Story = {
  args: {
    ...defaultPresentation,
    links: [],
  },
};

export const WithoutEvent: Story = {
  args: {
    ...defaultPresentation,
    event: undefined,
  },
};