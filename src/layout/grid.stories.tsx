import type { Meta, StoryObj } from '@storybook/react-vite';

import { Grid } from './Grid';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

const columns = Array.from({ length: 12 }, (_, index) => (
  <div
    key={index}
    style={{
      minHeight: '160px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px dashed var(--md-sys-color-outline)',
      background: 'var(--md-sys-color-surface-container)',
      color: 'var(--md-sys-color-on-surface)',
      fontFamily: 'Roboto, sans-serif',
    }}
  >
    {index + 1}
  </div>
));

export const Expanded: Story = {
  render: () => <Grid>{columns}</Grid>,
};

export const Large: Story = {
  render: () => <Grid>{columns}</Grid>,
};