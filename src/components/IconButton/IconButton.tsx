import type {
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

import StarsFilledIcon from '../../assets/icons/stars_filled.svg?react';
import './IconButton.css';

export type IconButtonType = 'Round' | 'Square';
export type IconButtonSize = 'XSmall' | 'Small' | 'Medium' | 'Large' | 'XLarge';
export type IconButtonWidth = 'Narrow' | 'Default' | 'Wide';
export type IconButtonVariant = 'standard' | 'plain';
export type IconButtonState =
  | 'Enabled'
  | 'Hovered'
  | 'Focused'
  | 'Pressed'
  | 'Disabled';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  icon?: ReactNode;
  showFocusIndicator?: boolean;
  type?: IconButtonType;
  size?: IconButtonSize;
  width?: IconButtonWidth;
  state?: IconButtonState;
  variant?: IconButtonVariant;
}

const defaultIcon = <StarsFilledIcon aria-hidden="true" />;

export function IconButton({
  icon = defaultIcon,
  showFocusIndicator = false,
  type = 'Round',
  size = 'Small',
  width = 'Default',
  state = 'Enabled',
  variant = 'standard',
  disabled,
  className,
  ...buttonProps
}: IconButtonProps) {
  const isDisabled = disabled || state === 'Disabled';

  const classes = [
    'design-system-icon-button',
    `design-system-icon-button--${type.toLowerCase()}`,
    `design-system-icon-button--${size.toLowerCase()}`,
    `design-system-icon-button--${width.toLowerCase()}`,
    `design-system-icon-button--${state.toLowerCase()}`,
    `design-system-icon-button--${variant}`,
    showFocusIndicator
      ? 'design-system-icon-button--focus-indicator'
      : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...buttonProps}
      className={classes}
      disabled={isDisabled}
      type="button"
      aria-label={buttonProps['aria-label'] ?? 'Icon button'}
    >
      <span className="design-system-icon-button__state-layer">
        <span className="design-system-icon-button__icon">
          {icon}
        </span>
      </span>
    </button>
  );
}