import clsx from 'clsx';
import { MouseEvent } from 'react';

import {
  ICON_BUTTON_COLORS_STYLES,
  ICON_BUTTON_THEMES,
} from '@/components/Button/IconButton/constants';
import { BUTTON_PENDING_ICON_KEY } from '@/components/Button/shared';
import { Icon } from '@/components/Icon';
import { Tooltip } from '@/components/Tooltip';
import { IconButtonProps } from './types';

const IconButton = ({
  ref,
  iconKey,
  type = 'button',
  theme = ICON_BUTTON_THEMES.HOVER_GRAY,
  'aria-label': ariaLabel,
  tooltipOption,
  className,
  disabled = false,
  isPending = false,
  onClick,
}: IconButtonProps) => {
  const { content, placement = 'bottom' } = tooltipOption ?? {};
  const isDisabled = disabled || isPending;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isDisabled) return;

    onClick?.(e);
  };

  return (
    <Tooltip
      content={content ?? ariaLabel}
      rootClassName={className}
      placement={placement}
    >
      <button
        ref={ref}
        type={type}
        className={clsx(
          'rounded-in-6 text-in-body-16-b disabled:text-in-gray-04 in-flex-h-stack-center h-8 w-8 cursor-pointer transition-colors disabled:cursor-not-allowed',
          ICON_BUTTON_COLORS_STYLES[theme],
        )}
        aria-label={ariaLabel}
        disabled={isDisabled}
        onClick={handleClick}
      >
        <Icon
          iconKey={isPending ? BUTTON_PENDING_ICON_KEY : iconKey}
          className={clsx(isPending && 'animate-spin')}
          aria-hidden
        />
      </button>
    </Tooltip>
  );
};

export default IconButton;
