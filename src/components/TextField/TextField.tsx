import { useState, type InputHTMLAttributes, type ReactNode } from 'react';

import searchIcon from '../../assets/icons/search.svg';
import closeIcon from '../../assets/icons/close.svg';
import errorIcon from '../../assets/icons/error.svg';
import visibilityIcon from '../../assets/icons/visibility.svg';
import visibilityOffIcon from '../../assets/icons/visibility_off.svg';

import './TextField.css';

export type TextFieldStyle = 'Filled' | 'Outlined';

export type TextFieldState =
  | 'Enabled'
  | 'Hovered'
  | 'Active'
  | 'Focused'
  | 'Error'
  | 'Disabled';

export interface TextFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'placeholder' | 'style'
  > {
  labelText?: string;
  placeholderText?: string;
  supportingText?: string;
  showSupportingText?: boolean;
  style?: TextFieldStyle;
  state?: TextFieldState;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  trailingAction?: 'clear' | 'password-toggle';
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
  trailingAction,
  leadingIcon,
  trailingIcon,
  showLeadingIcon = false,
  showTrailingIcon = false,
  id = 'text-field',
  className,
  disabled,
  ...props
}: TextFieldProps) {
  /* ========================================
     State
     ======================================== */

  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isActive, setIsActive] = useState(false);

  /* ========================================
     Derived values
     ======================================== */

  const isDisabled = disabled || state === 'Disabled';

  const hasLeadingIcon =
    showLeadingIcon || Boolean(leadingIcon);

  const hasTrailingIcon =
    showTrailingIcon ||
    Boolean(trailingIcon) ||
    Boolean(trailingAction);

  const stateIcon =
    state === 'Error'
      ? <img src={errorIcon} alt="" />
      : trailingIcon;

  /* ========================================
     Render
     ======================================== */

  return (
    <label
      className={[
        'design-system-text-field',
        `design-system-text-field--${style.toLowerCase()}`,
        `design-system-text-field--${
          isActive ? 'active' : state.toLowerCase()
        }`,
        hasLeadingIcon
          ? 'design-system-text-field--leading'
          : '',
        hasTrailingIcon
          ? 'design-system-text-field--trailing'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      htmlFor={id}
    >
      <span className="design-system-text-field__control">

        {/* Outlined field */}
        {style === 'Outlined' && (
          <span
            className="design-system-text-field__outline"
            aria-hidden="true"
          >
            <span className="design-system-text-field__outline-leading" />

            <span className="design-system-text-field__outline-notch">
              <span className="design-system-text-field__label">
                {labelText}
              </span>
            </span>

            <span className="design-system-text-field__outline-trailing" />
          </span>
        )}

        {/* Leading icon */}
        {hasLeadingIcon && (
          <span className="design-system-text-field__icon design-system-text-field__leading-icon">
            {leadingIcon ?? (
              <img src={searchIcon} alt="" />
            )}
          </span>
        )}

        {/* Input content */}
        <span className="design-system-text-field__content">

          {/* Filled field label */}
          {style === 'Filled' && (
            <span className="design-system-text-field__label">
              {labelText}
            </span>
          )}

          <input
            {...props}
            id={id}
            disabled={isDisabled}
            placeholder={placeholderText}
            value={inputValue}
            onChange={(event) =>
              setInputValue(event.target.value)
            }
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            type={
              trailingAction === 'password-toggle'
                ? showPassword
                  ? 'text'
                  : 'password'
                : props.type
            }
          />
        </span>

        {/* Trailing icon / action */}
        {hasTrailingIcon && (
          <span className="design-system-text-field__icon design-system-text-field__trailing-icon">

            {trailingAction === 'clear' ? (
              <button
                type="button"
                onClick={() => setInputValue('')}
                aria-label="Clear text"
              >
                <img src={closeIcon} alt="" />
              </button>

            ) : trailingAction === 'password-toggle' ? (
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                <img
                  src={
                    showPassword
                      ? visibilityOffIcon
                      : visibilityIcon
                  }
                  alt=""
                />
              </button>

            ) : (
              stateIcon ?? (
                <img src={closeIcon} alt="" />
              )
            )}

          </span>
        )}

        {/* Filled active indicator */}
        <span
          className="design-system-text-field__active-indicator"
          aria-hidden="true"
        />

      </span>

      {/* Supporting text */}
      {showSupportingText && (
        <small>{supportingText}</small>
      )}
    </label>
  );
}