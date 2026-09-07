import type { HTMLAttributes } from 'react';

import './Grid.css';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {}

export function Grid({
  className,
  ...props
}: GridProps) {
  const classes = [
    'design-system-grid',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return <div {...props} className={classes} />;
}