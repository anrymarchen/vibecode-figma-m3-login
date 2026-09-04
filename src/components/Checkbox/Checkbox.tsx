import { useEffect, useRef } from 'react';
import type { InputHTMLAttributes } from 'react';

import './Checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  showFocusIndicator?: boolean;
  label?: string;
  indeterminate?: boolean;
  state?: 'Enabled' | 'Hovered' | 'Focused' | 'Pressed' | 'Disabled';
  variant?: 'Selected' | 'Unselected' | 'Indeterminate' | 'Error selected' | 'Error unselected' | 'Error indeterminate';
}

export function Checkbox({
  showFocusIndicator = false,
  label = 'Checkbox',
  indeterminate = false,
  state,
  variant = 'Unselected',
  className,
  disabled,
  ...props
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate || variant.includes('indeterminate');
  }, [indeterminate, variant]);

  const isIndeterminate = indeterminate || variant.includes('indeterminate');
  const isDisabled = disabled || state === 'Disabled';
  const visualVariant = isIndeterminate ? variant.replace('selected', 'indeterminate') : variant;

  return (
    <label className={[
      'design-system-checkbox',
      `design-system-checkbox--${visualVariant.toLowerCase().replaceAll(' ', '-')}`,
      state ? `design-system-checkbox--${state.toLowerCase()}` : '',
      showFocusIndicator ? 'design-system-checkbox--focus' : '',
      className,
    ].filter(Boolean).join(' ')}>
      <input
        {...props}
        ref={inputRef}
        type="checkbox"
        disabled={isDisabled}
        aria-checked={isIndeterminate ? 'mixed' : undefined}
      />
      <span className="design-system-checkbox__state-layer" aria-hidden="true">
        <span className="design-system-checkbox__box">
          {isIndeterminate ? <span className="design-system-checkbox__indeterminate" /> : <span className="design-system-checkbox__check" />}
        </span>
      </span>
      {label && <span className="design-system-checkbox__label">{label}</span>}
    </label>
  );
}
