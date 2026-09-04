import type { InputHTMLAttributes, ReactNode } from 'react';
import searchIcon from '../../assets/icons/search.svg';
import closeIcon from '../../assets/icons/close.svg';
import errorIcon from '../../assets/icons/error.svg';

import './TextField.css';

export type TextFieldStyle = 'Filled' | 'Outlined';
export type TextFieldState = 'Enabled' | 'Hovered' | 'Focused' | 'Error' | 'Disabled';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder' | 'style'> {
  labelText?: string;
  placeholderText?: string;
  supportingText?: string;
  showSupportingText?: boolean;
  style?: TextFieldStyle;
  state?: TextFieldState;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  showLeadingIcon?: boolean;
  showTrailingIcon?: boolean;
}

export function TextField({
  labelText = 'Label',
  placeholderText = 'Placeholder',
  supportingText = 'Supporting text',
  showSupportingText = true,
  style = 'Outlined',
  state = 'Enabled',
  leadingIcon,
  trailingIcon,
  showLeadingIcon = false,
  showTrailingIcon = false,
  id = 'text-field',
  className,
  disabled,
  ...props
}: TextFieldProps) {
  const isDisabled = disabled || state === 'Disabled';
  const hasLeadingIcon = showLeadingIcon || Boolean(leadingIcon);
  const hasTrailingIcon = showTrailingIcon || Boolean(trailingIcon);
  const stateIcon = state === 'Error' ? <img src={errorIcon} alt="" /> : trailingIcon;

  return (
    <label className={[
      'design-system-text-field',
      `design-system-text-field--${style.toLowerCase()}`,
      `design-system-text-field--${state.toLowerCase()}`,
      hasLeadingIcon ? 'design-system-text-field--leading' : '',
      hasTrailingIcon ? 'design-system-text-field--trailing' : '',
      className,
    ].filter(Boolean).join(' ')} htmlFor={id}>
      <span className="design-system-text-field__control">
        {hasLeadingIcon && <span className="design-system-text-field__icon design-system-text-field__leading-icon">{leadingIcon ?? <img src={searchIcon} alt="" />}</span>}
        <span className="design-system-text-field__content">
          <span className="design-system-text-field__label">{labelText}</span>
          <input {...props} id={id} disabled={isDisabled} placeholder={placeholderText} />
        </span>
        {hasTrailingIcon && <span className="design-system-text-field__icon design-system-text-field__trailing-icon">{stateIcon ?? <img src={closeIcon} alt="" />}</span>}
      </span>
      <span className="design-system-text-field__active-indicator" aria-hidden="true" />
      {showSupportingText && <small>{supportingText}</small>}
    </label>
  );
}
