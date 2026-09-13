import type { HTMLAttributes } from 'react';

import './Grid.css';

export type GridVariant = 'default' | 'inlay';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GridVariant;
}

export function Grid({
  className,
  variant = 'default',
  ...props
}: GridProps) {
  const classes = [
    'design-system-grid',
    `design-system-grid--${variant}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div {...props} className={classes} />;
}