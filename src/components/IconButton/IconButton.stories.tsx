import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';

const meta = {
  title: 'Components/Icon Button',
  component: IconButton,
  tags: ['autodocs'],

  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['Round', 'Square'],
    },
    size: {
      control: 'select',
      options: ['XSmall', 'Small', 'Medium', 'Large', 'XLarge'],
    },
    width: {
      control: 'inline-radio',
      options: ['Narrow', 'Default', 'Wide'],
    },
    state: {
      control: 'select',
      options: ['Enabled', 'Hovered', 'Focused', 'Pressed', 'Disabled'],
    },
    showFocusIndicator: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },

  args: {
    showFocusIndicator: true,
    'aria-label': 'Favorite',
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hovered: Story = {
  args: {
    state: 'Hovered',
  },
};

export const Focused: Story = {
  args: {
    state: 'Focused',
  },
};

export const Pressed: Story = {
  args: {
    state: 'Pressed',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    state: 'Disabled',
  },
};