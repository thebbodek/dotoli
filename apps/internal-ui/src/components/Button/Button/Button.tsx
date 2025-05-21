import clsx from 'clsx';
import Link from 'next/link';
import { ElementType, MouseEvent, Ref } from 'react';

import {
  BUTTON_COLORS,
  BUTTON_ELEMENTS,
  BUTTON_GAP_STYLES_MAPPER,
  BUTTON_PADDING_STYLES_MAPPER,
  BUTTON_SIZE_STYLES_MAPPER,
  BUTTON_SIZES,
  BUTTON_STATUS,
  BUTTON_STYLES_MAPPER,
  BUTTON_VARIANTS,
} from '@/components/Button/Button/constants';
import useButtonRenderErrorEffect from '@/components/Button/Button/hooks/effects/useButtonRenderErrorEffect';
import {
  ButtonElementType,
  ButtonProps,
  ButtonStyles,
} from '@/components/Button/Button/types';

const Button = <T extends ButtonElementType>({
  label,
  as: Element = BUTTON_ELEMENTS.BUTTON as T,
  variant = BUTTON_VARIANTS.FILLED,
  color = BUTTON_COLORS.PRIMARY,
  size = BUTTON_SIZES.LARGE,
  leftIcon,
  rightIcon,
  className,
  disabled,
  onClick,
  ref,
  ...rest
}: ButtonProps<T>) => {
  const styles = BUTTON_STYLES_MAPPER[color][variant] ?? ({} as ButtonStyles);
  const isLink = Element === BUTTON_ELEMENTS.LINK;
  const props = isLink
    ? { 'aria-disabled': disabled, tabIndex: disabled ? -1 : 0, ...rest }
    : { disabled, type: 'button' as const, ...rest };
  const Component: ElementType = isLink ? Link : Element;

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();

      return;
    }

    onClick?.(e);
  };

  useButtonRenderErrorEffect({ variant, color, size });

  return (
    <Component
      className={clsx(
        'flex items-center justify-center transition-colors',
        BUTTON_SIZE_STYLES_MAPPER[size],
        styles[disabled ? BUTTON_STATUS.DISABLED : BUTTON_STATUS.DEFAULT],
        (!!leftIcon || !!rightIcon) && BUTTON_GAP_STYLES_MAPPER[size],
        variant !== BUTTON_VARIANTS.TEXT && BUTTON_PADDING_STYLES_MAPPER[size],
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
      ref={ref as Ref<HTMLButtonElement>}
      onClick={handleClick}
      {...props}
    >
      {leftIcon}
      {label}
      {rightIcon}
    </Component>
  );
};

export default Button;
