import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    shape: {
      control: 'inline-radio',
      options: ['round', 'square'],
    },
    showIcon: { control: 'boolean' },
    showFocusIndicator: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    size: 'medium',
    shape: 'round',
    showIcon: true,
    showFocusIndicator: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    shape: "square"
  }
};

export const WithoutIcon: Story = {
  args: {
    showIcon: false,
  },
};

export const WithCustomIcon: Story = {
  args: {
    icon: <span aria-hidden="true">+</span>,
  },
};

export const Square: Story = {
  args: {
    shape: 'square',
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      {(['xsmall', 'small', 'medium', 'large', 'xlarge'] as const).map((size) => (
        <Button {...args} key={size} size={size} label={size} />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const FocusIndicator: Story = {
  args: {
    showFocusIndicator: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the keyboard to focus the button and inspect the focus indicator.',
      },
    },
  },
};

export const InteractiveStates: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Button {...args} label="Hover me" />
      <Button {...args} label="Press me" />
      <Button {...args} label="Focus me" showFocusIndicator />
    </div>
  ),
};
