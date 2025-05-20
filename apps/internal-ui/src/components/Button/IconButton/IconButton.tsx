import clsx from 'clsx';
import { MouseEvent } from 'react';

import {
  ICON_BUTTON_COLORS_STYLES,
  ICON_BUTTON_THEMES,
} from '@/components/Button/IconButton/constants';
import { Icon } from '@/components/Icon';
import { IconButtonProps } from './types';

const IconButton = ({
  iconKey,
  type = 'button',
  theme = ICON_BUTTON_THEMES.GRAY,
  arialLabel,
  className,
  disabled = false,
  onClick,
}: IconButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    onClick?.(e);
  };

  return (
    <button
      type={type}
      className={clsx(
        'rounded-6 text-gray-06 text-body-16-b active:text-primary-05 disabled:text-gray-04 flex h-8 w-8 cursor-pointer items-center justify-center transition-colors disabled:cursor-not-allowed',
        ICON_BUTTON_COLORS_STYLES[theme],
        className,
      )}
      aria-label={arialLabel}
      disabled={disabled}
      onClick={handleClick}
    >
      <Icon iconKey={iconKey} />
    </button>
  );
};

export default IconButton;
