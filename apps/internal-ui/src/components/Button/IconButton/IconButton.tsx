import clsx from 'clsx';
import { MouseEvent } from 'react';

import {
  ICON_BUTTON_COLORS,
  ICON_BUTTON_COLORS_STYLES_MAPPER,
} from '@/components/Button/IconButton/constants';
import { Icon } from '@/components/Icon';
import { IconButtonProps } from './types';

const IconButton = ({
  iconKey,
  color = ICON_BUTTON_COLORS.GRAY,
  arialLabel,
  className,
  disabled = false,
  onClick,
  ...props
}: IconButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    onClick?.(e);
  };

  return (
    <button
      className={clsx(
        'rounded-6 text-gray-06 text-body-16-b active:text-primary-05 disabled:text-gray-04 flex h-8 w-8 items-center justify-center transition-colors',
        ICON_BUTTON_COLORS_STYLES_MAPPER[color],
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
      aria-label={arialLabel}
      disabled={disabled}
      type='button'
      onClick={handleClick}
      {...props}
    >
      <Icon iconKey={iconKey} />
    </button>
  );
};

export default IconButton;
