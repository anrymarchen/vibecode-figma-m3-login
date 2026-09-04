import type { HTMLAttributes, ReactNode } from 'react';

import './StackedCard.css';

export type CardStyle = 'Outlined' | 'Elevated' | 'Filled';
export type CardLayout = 'Media & text' | 'Slot';

export interface StackedCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'content' | 'style'> {
  headerText?: string;
  subheadText?: string;
  titleText?: string;
  subtitleText?: string;
  supportingText?: string;
  content?: ReactNode;
  background?: ReactNode;
  showSecondaryAction?: boolean;
  secondaryAction?: ReactNode;
  style?: CardStyle;
  layout?: CardLayout;
}

export function StackedCard({
  headerText = 'Header',
  subheadText = 'Subhead',
  titleText = 'Title',
  subtitleText = 'Subtitle',
  supportingText = 'Lorem ipsum',
  content,
  background,
  showSecondaryAction = true,
  secondaryAction,
  style = 'Outlined',
  layout = 'Media & text',
  className,
  ...props
}: StackedCardProps) {
  return (
    <article {...props} className={['design-system-stacked-card', `design-system-stacked-card--${style.toLowerCase()}`, className].filter(Boolean).join(' ')}>
      {layout === 'Media & text' ? (
        <>
          <header><span className="design-system-stacked-card__avatar">A</span><div><strong>{headerText}</strong><small>{subheadText}</small></div><span aria-hidden="true">⋮</span></header>
          <div className="design-system-stacked-card__media">{background ?? '✦'}</div>
          <div className="design-system-stacked-card__body"><h3>{titleText}</h3><div>{subtitleText}</div><p>{supportingText}</p>{content}</div>
          {showSecondaryAction && secondaryAction && <div className="design-system-stacked-card__action">{secondaryAction}</div>}
        </>
      ) : <div className="design-system-stacked-card__slot">{content ?? 'Slot'}</div>}
    </article>
  );
}
