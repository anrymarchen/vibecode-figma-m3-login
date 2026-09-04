import type { InputHTMLAttributes } from 'react';

import './Checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  showFocusIndicator?: boolean;
  label?: string;
}

export function Checkbox({ showFocusIndicator = false, label = 'Checkbox', className, ...props }: CheckboxProps) {
  return <label className={['design-system-checkbox', showFocusIndicator ? 'design-system-checkbox--focus' : '', className].filter(Boolean).join(' ')}><input {...props} type="checkbox" /><span className="design-system-checkbox__box" aria-hidden="true" /><span>{label}</span></label>;
}
