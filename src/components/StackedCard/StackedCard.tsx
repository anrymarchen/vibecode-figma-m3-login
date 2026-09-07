import type { HTMLAttributes, ReactNode } from 'react';

import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import moreVertIcon from '../../assets/icons/more_vert.svg';

import './StackedCard.css';

export type CardStyle = 'Outlined' | 'Elevated' | 'Filled';
export type CardLayout = 'Media & text' | 'Slot';


export interface StackedCardProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'content' | 'style'> {
  headerText?: string;
  subheadText?: string;
  titleText?: string;
  subtitleText?: string;
  supportingText?: string;

  avatar?: ReactNode;
  headerAction?: ReactNode;
  media?: ReactNode;

  content?: ReactNode;

  showSecondaryAction?: boolean;
  secondaryAction?: ReactNode;
  primaryAction?: ReactNode;

  style?: CardStyle;
  layout?: CardLayout;
}

const defaultAvatar = (
  <span
    className="design-system-stacked-card__avatar"
    aria-hidden="true"
  >
    A
  </span>
);

const defaultHeaderAction = (
  <IconButton
    aria-label="More options"
    size="Small"
    width="Default"
    variant="plain"
    icon={<img src={moreVertIcon} alt="" />}
  />
)

const defaultSecondaryAction = (
  <Button
    label="Secondary"
    showIcon={false}
    size="small"
    variant="outline"
  />
);

const defaultPrimaryAction = (
  <Button
    label="Primary"
    showIcon={false}
    size="small"
    variant="filled"
  />
);

export function StackedCard({
  headerText = 'Header',
  subheadText = 'Subhead',
  titleText = 'Title',
  subtitleText = 'Subtitle',
  supportingText = 'Cards are versatile containers, holding anything from images to headlines, supporting text, buttons, lists, and other components.',

  avatar = defaultAvatar,
  headerAction = defaultHeaderAction,
  media,

  content,

  showSecondaryAction = true,
  secondaryAction = defaultSecondaryAction,
  primaryAction = defaultPrimaryAction,

  style = 'Outlined',
  layout = 'Media & text',

  className,
  ...props
}: StackedCardProps) {
  const classes = [
    'design-system-stacked-card',
    `design-system-stacked-card--${style.toLowerCase()}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article {...props} className={classes}>
      {layout === 'Media & text' ? (
        <>
          <header className="design-system-stacked-card__header">
            {avatar}

            <div className="design-system-stacked-card__header-text">
              <strong className="design-system-stacked-card__header-title">
                {headerText}
              </strong>

              <span className="design-system-stacked-card__subhead">
                {subheadText}
              </span>
            </div>

            <div className="design-system-stacked-card__header-action">
              {headerAction}
            </div>
          </header>

          <div className="design-system-stacked-card__media">
            {media}
          </div>

          <div className="design-system-stacked-card__body">
            <div className="design-system-stacked-card__headline">
              <span className="design-system-stacked-card__title">
                {titleText}
              </span>

              <span className="design-system-stacked-card__subtitle">
                {subtitleText}
              </span>
            </div>

            <p className="design-system-stacked-card__supporting-text">
              {supportingText}
            </p>

            <div className="design-system-stacked-card__actions">
              {showSecondaryAction && (
                <div className="design-system-stacked-card__action design-system-stacked-card__action--secondary">
                  {secondaryAction}
                </div>
              )}

              <div className="design-system-stacked-card__action design-system-stacked-card__action--primary">
                {primaryAction}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="design-system-stacked-card__slot">
          {content}
        </div>
      )}
    </article>
  );
}