import type { InputHTMLAttributes } from 'react';

import './TextField.css';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  placeholderText?: string;
  supportingText?: string;
  showSupportingText?: boolean;
}

export function TextField({ labelText = 'Label', placeholderText = 'Placeholder', supportingText = 'Supporting text', showSupportingText = true, id = 'text-field', className, ...props }: TextFieldProps) {
  return <label className={['design-system-text-field', className].filter(Boolean).join(' ')} htmlFor={id}><span>{labelText}</span><input {...props} id={id} placeholder={placeholderText} />{showSupportingText && <small>{supportingText}</small>}</label>;
}
