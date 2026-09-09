import type { ButtonHTMLAttributes, ReactNode } from 'react';

import './Button.css';
import StarsFilledIcon from '../../assets/icons/stars_filled.svg?react';

export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type ButtonShape = 'round' | 'square';
export type ButtonVariant = 'filled' | 'outline' | 'text';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label?: string;
  showIcon?: boolean;
  icon?: ReactNode;
  showFocusIndicator?: boolean;
  size?: ButtonSize;
  shape?: ButtonShape;
  variant?: ButtonVariant;
}

const defaultIcon = <StarsFilledIcon aria-hidden="true" />;

export function Button({
  label = 'Label',
  showIcon = true,
  icon = defaultIcon,
  showFocusIndicator = false,
  size = 'medium',
  shape = 'round',
  variant = 'filled',
  className,
  disabled,
  type = 'button',
  ...buttonProps
}: ButtonProps) {
  const classes = [
    'design-system-button',
    `design-system-button--${size}`,
    `design-system-button--${shape}`,
    `design-system-button--${variant}`,
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
