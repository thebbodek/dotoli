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
      type={type}
      aria-label={ariaLabel}
      className={clsx(className, 'shrink-0')}
      onClick={handleClick}
      disabled={disabled}
    >
      <Icon
        iconKey={iconKey}
        weight={weight}
        className='text-in-gray-05 text-[1.125rem]'
      />
    </button>
  );
};

export default InputIconButton;
