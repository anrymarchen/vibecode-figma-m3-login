import {
  useState,
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';

import SearchIcon from '../../assets/icons/search.svg?react';
import CloseIcon from '../../assets/icons/close.svg?react';
import ErrorIcon from '../../assets/icons/error.svg?react';
import VisibilityIcon from '../../assets/icons/visibility.svg?react';
import VisibilityOffIcon from '../../assets/icons/visibility_off.svg?react';

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

  /**
   * Called whenever the field value changes, including when
   * the clear action is used.
   */
  onValueChange?: (value: string) => void;
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
  defaultValue,
  value,
  onValueChange,
  onChange,
  onFocus,
  onBlur,
  ...props
}: TextFieldProps) {
  /* ========================================
     State
     ======================================== */

  const [showPassword, setShowPassword] = useState(false);

  const [inputValue, setInputValue] = useState(() =>
    typeof defaultValue === 'string' ? defaultValue : '',
  );

  const [isActive, setIsActive] = useState(false);

  /* ========================================
     Derived values
     ======================================== */

  const isDisabled = disabled || state === 'Disabled';

  // If value is provided, the component is controlled.
  // Otherwise, it manages its own internal value.
  const currentValue =
    value !== undefined ? value : inputValue;

  const hasLeadingIcon =
    showLeadingIcon || Boolean(leadingIcon);

  const hasTrailingIcon =
    showTrailingIcon ||
    Boolean(trailingIcon) ||
    Boolean(trailingAction);

  const hasTrailingAction =
    Boolean(trailingAction) && Boolean(currentValue);

  const stateIcon =
    state === 'Error' ? (
      <ErrorIcon aria-hidden="true" />
    ) : (
      trailingIcon
    );

  /* ========================================
     Event handlers
     ======================================== */

  // Handles normal text input changes.
  // Updates internal state only when the component is uncontrolled.
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;

    if (value === undefined) {
      setInputValue(newValue);
    }

    onValueChange?.(newValue);
    onChange?.(event);
  };

  // Clears the field using the same value-change mechanism
  // as normal typing.
  const handleClear = () => {
    if (value === undefined) {
      setInputValue('');
    }

    onValueChange?.('');

  };

  // Keeps the component's active visual state while preserving
  // any native onFocus callback supplied by the consumer.
  const handleFocus = (
    event: FocusEvent<HTMLInputElement>,
  ) => {
    setIsActive(true);
    onFocus?.(event);
  };

  // Removes the active visual state while preserving
  // any native onBlur callback supplied by the consumer.
  const handleBlur = (
    event: FocusEvent<HTMLInputElement>,
  ) => {
    setIsActive(false);
    onBlur?.(event);
  };

  // Toggles password visibility without affecting the field value.
  const handlePasswordToggle = () => {
    setShowPassword((current) => !current);
  };

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

        {/* ========================================
           Outlined field border + label
           ======================================== */}

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

        {/* ========================================
           Leading icon
           ======================================== */}

        {hasLeadingIcon && (
          <span className="design-system-text-field__icon design-system-text-field__leading-icon">
            {leadingIcon ?? (
              <SearchIcon aria-hidden="true" />
            )}
          </span>
        )}

        {/* ========================================
           Input content
           ======================================== */}

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
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            type={
              trailingAction === 'password-toggle'
                ? showPassword
                  ? 'text'
                  : 'password'
                : props.type
            }
          />
        </span>

        {/* ========================================
           Trailing icon / action
           ======================================== */}

        {hasTrailingIcon && (
          <span className="design-system-text-field__icon design-system-text-field__trailing-icon">

            {/* Clear action */}

            {trailingAction === 'clear' && hasTrailingAction ? (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear text"
                disabled={isDisabled}
              >
                <CloseIcon aria-hidden="true" />
              </button>

            /* Password visibility toggle */

            ) : trailingAction === 'password-toggle' && hasTrailingAction ? (
              <button
                type="button"
                onClick={handlePasswordToggle}
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
                disabled={isDisabled}
              >
                {showPassword ? (
                  <VisibilityOffIcon aria-hidden="true" />
                ) : (
                  <VisibilityIcon aria-hidden="true" />
                )}
              </button>

            /* Static trailing icon */

            ) : !trailingAction ? (
              stateIcon ?? (
                <CloseIcon aria-hidden="true" />
              )
            ) : null}

          </span>
        )}

        {/* ========================================
           Filled active indicator
           ======================================== */}

        <span
          className="design-system-text-field__active-indicator"
          aria-hidden="true"
        />

      </span>

      {/* ========================================
         Supporting text
         ======================================== */}

      <small
        className={
          showSupportingText
            ? ''
            : 'design-system-text-field__supporting-text--hidden'
        }
      >
        {supportingText}
      </small>
    </label>
  );
}