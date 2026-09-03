import type { Meta, StoryObj } from '@storybook/react-vite';

import { ButtonText } from './ButtonText';

const meta = {
  title: 'Components/Button Text',
  component: ButtonText,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xsmall', 'small', 'medium', 'large', 'xlarge'] },
    shape: { control: 'inline-radio', options: ['round', 'square'] },
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
} satisfies Meta<typeof ButtonText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutIcon: Story = { args: { showIcon: false } };
export const Square: Story = { args: { shape: 'square' } };
export const Disabled: Story = { args: { disabled: true } };
export const FocusIndicator: Story = { args: { showFocusIndicator: true } };
export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      {(['xsmall', 'small', 'medium', 'large', 'xlarge'] as const).map((size) => (
        <ButtonText {...args} key={size} size={size} label={size} />
      ))}
    </div>
  ),
};
