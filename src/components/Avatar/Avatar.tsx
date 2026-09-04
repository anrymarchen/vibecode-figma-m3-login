import type { HTMLAttributes } from 'react';

import './Avatar.css';

export type AvatarStyle = 'Avatar' | 'Monogram' | 'Check';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  letter?: string;
  style?: AvatarStyle;
}

export function Avatar({ letter = 'A', style = 'Monogram', className, ...props }: AvatarProps) {
  return (
    <div {...props} className={['design-system-avatar', `design-system-avatar--${style.toLowerCase()}`, className].filter(Boolean).join(' ')}>
      {style === 'Check' ? '✓' : style === 'Avatar' ? '◯' : letter.slice(0, 1)}
    </div>
  );
}
