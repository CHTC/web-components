import type { Meta, StoryObj } from '@storybook/react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import LabeledIconButton from '../src/LabeledIconButton/LabeledIconButton';

const meta: Meta<typeof LabeledIconButton> = {
  title: 'Components/Buttons/LabeledIconButton',
  component: LabeledIconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Info',
    href: '/sample-link',
    children: <InfoOutlinedIcon />,
  },
};