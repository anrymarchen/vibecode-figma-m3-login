import type {
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

import starsFilledIcon from '../../assets/icons/stars_filled.svg';
import './IconButton.css';

export type IconButtonType = 'Round' | 'Square';
export type IconButtonSize = 'XSmall' | 'Small' | 'Medium' | 'Large' | 'XLarge';
export type IconButtonWidth = 'Narrow' | 'Default' | 'Wide';
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
}

const defaultIcon = (
  <img
    src={starsFilledIcon}
    alt=""
    className="design-system-icon-button__default-icon"
  />
);

export function IconButton({
  icon = defaultIcon,
  showFocusIndicator = false,
  type = 'Round',
  size = 'Small',
  width = 'Default',
  state = 'Enabled',
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