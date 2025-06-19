import clsx from 'clsx';
import { MouseEvent } from 'react';

import {
  ICON_BUTTON_COLORS_STYLES,
  ICON_BUTTON_THEMES,
} from '@/components/Button/IconButton/constants';
import { BUTTON_PENDING_ICON_KEY } from '@/components/Button/shared';
import { Icon } from '@/components/Icon';
import { IconButtonProps } from './types';

const IconButton = ({
  ref,
  iconKey,
  type = 'button',
  theme = ICON_BUTTON_THEMES.GRAY,
  arialLabel,
  className,
  disabled = false,
  isPending = false,
  onClick,
}: IconButtonProps) => {
  const isDisabled = disabled || isPending;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isDisabled) return;

    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        'rounded-6 text-gray-06 text-body-16-b active:text-primary-05 disabled:text-gray-04 flex h-8 w-8 cursor-pointer items-center justify-center transition-colors disabled:cursor-not-allowed',
        ICON_BUTTON_COLORS_STYLES[theme],
        className,
      )}
      aria-label={arialLabel}
      disabled={isDisabled}
      onClick={handleClick}
    >
      <Icon
        iconKey={isPending ? BUTTON_PENDING_ICON_KEY : iconKey}
        className={clsx(isPending && 'animate-spin')}
      />
    </button>
  );
};

export default IconButton;
