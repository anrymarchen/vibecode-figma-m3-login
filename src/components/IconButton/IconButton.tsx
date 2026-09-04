import type { ButtonHTMLAttributes, ReactNode } from 'react';
import starsFilledIcon from '../../assets/icons/stars_filled.svg';
import './IconButton.css';

export type IconButtonType = 'Round' | 'Square';
export type IconButtonSize = 'XSmall' | 'Small' | 'Medium' | 'Large' | 'XLarge';
export type IconButtonWidth = 'Narrow' | 'Default' | 'Wide';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  icon?: ReactNode;
  showFocusIndicator?: boolean;
  type?: IconButtonType;
  size?: IconButtonSize;
  width?: IconButtonWidth;
}

export function IconButton({ icon, showFocusIndicator = false, type = 'Round', size = 'Small', width = 'Default', className, 'aria-label': ariaLabel = 'Icon button', ...props }: IconButtonProps) {
  return <button {...props} aria-label={ariaLabel} className={['design-system-icon-button', `design-system-icon-button--${type.toLowerCase()}`, `design-system-icon-button--${size.toLowerCase()}`, `design-system-icon-button--${width.toLowerCase()}`, showFocusIndicator ? 'design-system-icon-button--focus' : '', className].filter(Boolean).join(' ')}>{icon ?? <img src={starsFilledIcon} alt="" />}</button>;
}
