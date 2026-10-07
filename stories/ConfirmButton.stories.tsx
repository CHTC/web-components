import type { Meta, StoryObj } from "@storybook/nextjs";
import GarbageIcon from "@mui/icons-material/Delete"

import ConfirmButton, { ConfirmButtonProps } from '../src/ConfirmButton/ConfirmButton';

const meta: Meta<typeof ConfirmButton> = {
  title: 'Components/ConfirmButton',
  component: ConfirmButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'confirm',
    color: 'error',
    disabled: false,
		children: <GarbageIcon />,
		onConfirm: () => alert('Confirmed!'),
  } as ConfirmButtonProps,
};

export const SpecificNode: Story = {
	args: {
		'aria-label': 'confirm',
		color: 'error',
		disabled: false,
		children: <GarbageIcon />,
		confirmNode: "Delete",
		onConfirm: () => alert('Confirmed!'),
	} as ConfirmButtonProps,
};


export const ExpandLeft: Story = {
  render: (args) => (
    <div style={{ position: 'fixed', top: '50%', right: 0, transform: 'translateY(-50%)', zIndex: 999, padding: 8, background: '#f8f8f8', border: '1px solid #ddd' }}>
      <ConfirmButton {...args as ConfirmButtonProps} />
    </div>
  ),
  args: {
    'aria-label': 'confirm',
    color: 'error',
    disabled: false,
    children: <GarbageIcon />,
		onConfirm: () => alert('Confirmed!'),
  } as ConfirmButtonProps,
};

export const ExpandOverIcon: Story = {
	render: (args) => (
		<div style={{display: 'flex', flexDirection: 'row'}}>
			<ConfirmButton {...args as ConfirmButtonProps} />
			<GarbageIcon />
		</div>
	),
	args: {
		'aria-label': 'confirm',
		color: 'error',
		disabled: false,
		children: <GarbageIcon />,
		onConfirm: () => alert('Confirmed!'),
	} as ConfirmButtonProps,
}
