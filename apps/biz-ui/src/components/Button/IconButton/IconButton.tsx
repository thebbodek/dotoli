import clsx from 'clsx';

import {
  ICON_BUTTON_SIZES,
  ICON_BUTTON_THEMES,
} from '@/components/Button/IconButton/constants';
import { IconButtonProps } from '@/components/Button/IconButton/types';
import { generateIconButtonStyle } from '@/components/Button/IconButton/utils';
import { ButtonIcon } from '@/components/Button/shared';
import { BUTTON_PENDING_ICON_KEY } from '@/components/Button/shared/constants';

const IconButton = ({
  iconKey,
  weight,
  theme = ICON_BUTTON_THEMES.DEFAULT,
  size = ICON_BUTTON_SIZES.LG,
  isPending = false,
  disabled = false,
  type = 'button',
  className,
  onClick,
  ref,
  'aria-label': ariaLabel,
}: IconButtonProps) => {
  const isDisabled = disabled || isPending;

  return (
    <button
      className={clsx(
        className,
        generateIconButtonStyle({ theme, size, disabled: isDisabled }),
      )}
      aria-busy={isPending}
      aria-label={ariaLabel}
      disabled={isDisabled}
      ref={ref}
      type={type}
      onClick={onClick}
    >
      {isPending ? (
        <ButtonIcon
          className='animate-spin'
          iconKey={BUTTON_PENDING_ICON_KEY}
        />
      ) : (
        <ButtonIcon iconKey={iconKey} weight={weight} />
      )}
    </button>
  );
};

export default IconButton;
