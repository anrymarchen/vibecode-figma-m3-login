import type { ButtonProps } from '../Button/Button';
import { Button } from '../Button/Button';

export type ButtonOutlineProps = Omit<ButtonProps, 'variant'>;

export function ButtonOutline(props: ButtonOutlineProps) {
  return <Button {...props} variant="outline" />;
}
