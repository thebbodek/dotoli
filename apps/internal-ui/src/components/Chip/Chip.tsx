import clsx from 'clsx';
import { MouseEvent } from 'react';

import { Icon } from '@/components/Icon';
import { ChipProps } from './types';

const Chip = ({
  label,
  onClick,
  disabled,
  className,
  ariaLabel,
}: ChipProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <button
      className={clsx(
        className,
        'text-body-14-r text-primary-06 bg-primary-02 flex h-[1.5rem] items-center gap-x-1 rounded-full px-3',
      )}
      aria-label={ariaLabel ?? `${label} 제거`}
      disabled={disabled}
      type='button'
      onClick={handleClick}
    >
      {label}
      <Icon className='text-[0.75rem]' iconKey='x' aria-hidden />
    </button>
  );
};

export default Chip;
