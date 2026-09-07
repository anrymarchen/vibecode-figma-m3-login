import type { Meta, StoryObj } from '@storybook/react-vite';

import './material.css';

const meta = {
  title: 'Foundations/Typography',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoginPageStyles: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '32px',
        color: 'var(--md-sys-color-on-surface)',
      }}
    >
      <div>
        <div
          style={{
            fontFamily: 'var(--md-sys-typescale-h4-font-family)',
            fontSize: 'var(--md-sys-typescale-h4-font-size)',
            fontWeight: 'var(--md-sys-typescale-h4-font-weight)',
            lineHeight: 'var(--md-sys-typescale-h4-line-height)',
            letterSpacing: 'var(--md-sys-typescale-h4-letter-spacing)',
          }}
        >
          H4 — Login
        </div>
        <small>32px / 123.5%</small>
      </div>

      <div>
        <div
          style={{
            fontFamily: 'var(--md-sys-typescale-h6-font-family)',
            fontSize: 'var(--md-sys-typescale-h6-font-size)',
            fontWeight: 'var(--md-sys-typescale-h6-font-weight)',
            lineHeight: 'var(--md-sys-typescale-h6-line-height)',
            letterSpacing: 'var(--md-sys-typescale-h6-letter-spacing)',
          }}
        >
          H6 — Welcome back
        </div>
        <small>20px / 32px</small>
      </div>

      <div>
        <div
          style={{
            fontFamily: 'var(--md-sys-typescale-label-large-font-family)',
            fontSize: 'var(--md-sys-typescale-label-large-font-size)',
            fontWeight: 'var(--md-sys-typescale-label-large-font-weight)',
            lineHeight: 'var(--md-sys-typescale-label-large-line-height)',
            letterSpacing:
              'var(--md-sys-typescale-label-large-letter-spacing)',
          }}
        >
          LABEL LARGE
        </div>
        <small>14px / 20px / Bold</small>
      </div>
    </div>
  ),
};