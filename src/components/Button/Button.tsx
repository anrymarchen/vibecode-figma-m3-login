import type { ButtonHTMLAttributes, ReactNode } from 'react';

import './Button.css';

export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type ButtonShape = 'round' | 'square';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label?: string;
  showIcon?: boolean;
  icon?: ReactNode;
  showFocusIndicator?: boolean;
  size?: ButtonSize;
  shape?: ButtonShape;
}

const defaultIcon = (
  <svg
    aria-hidden="true"
    className="design-system-button__default-icon"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="9" fill="currentColor" />
    <path
      d="m12 6.75 1.55 3.17 3.5.51-2.53 2.46.6 3.49L12 14.73l-3.12 1.65.6-3.49-2.53-2.46 3.5-.51L12 6.75Z"
      fill="#6750A4"
    />
  </svg>
);

export function Button({
  label = 'Label',
  showIcon = true,
  icon = defaultIcon,
  showFocusIndicator = false,
  size = 'medium',
  shape = 'round',
  className,
  disabled,
  type = 'button',
  ...buttonProps
}: ButtonProps) {
  const classes = [
    'design-system-button',
    `design-system-button--${size}`,
    `design-system-button--${shape}`,
    showFocusIndicator ? 'design-system-button--focus-indicator' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...buttonProps}
      className={classes}
      disabled={disabled}
      type={type}
    >
      <span className="design-system-button__state-layer">
        {showIcon && <span className="design-system-button__icon">{icon}</span>}
        <span className="design-system-button__label">{label}</span>
      </span>
    </button>
  );
}
