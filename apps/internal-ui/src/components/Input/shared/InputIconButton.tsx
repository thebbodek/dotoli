import clsx from 'clsx';
import { MouseEvent } from 'react';

import { Icon } from '@/components/Icon';
import { InputIconButtonProps } from '@/components/Input/shared/types';

const InputIconButton = ({
  type = 'button',
  iconKey,
  weight = 'fill',
  disabled = false,
  'aria-label': ariaLabel,
  className,
  onClick,
}: InputIconButtonProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    onClick?.(e);
  };

  return (
    <button
      aria-label={ariaLabel}
      className={clsx(className, 'shrink-0')}
      disabled={disabled}
      type={type}
      onClick={handleClick}
    >
      <Icon
        className='text-in-gray-05 text-[1.125rem]'
        iconKey={iconKey}
        weight={weight}
      />
    </button>
  );
};

export default InputIconButton;
