import type { ButtonProps } from '../Button/Button';
import { Button } from '../Button/Button';

export type ButtonTextProps = Omit<ButtonProps, 'variant'>;

export function ButtonText(props: ButtonTextProps) {
  return <Button {...props} variant="text" />;
}
