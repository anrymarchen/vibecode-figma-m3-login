import type { Meta, StoryObj } from '@storybook/react-vite';
import { StackedCard } from './StackedCard';

const meta = {
  title: 'Components/Stacked Card',
  component: StackedCard,
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'inline-radio',
      options: ['Outlined', 'Elevated', 'Filled'],
    },
    layout: {
      control: 'inline-radio',
      options: ['Media & text', 'Slot'],
    },
    showSecondaryAction: {
      control: 'boolean',
    },
  },
  args: {
    showSecondaryAction: true,
  },
} satisfies Meta<typeof StackedCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Slot: Story = {
  args: {
    layout: 'Slot',
  },
};