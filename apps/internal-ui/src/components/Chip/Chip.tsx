import clsx from 'clsx';
import { MouseEvent } from 'react';

import { ChipProps } from './types';
import { Icon } from '@/components/Icon';

const Chip = ({
  label,
  onClick,
  disabled = false,
  className,
  'aria-label': ariaLabel,
}: ChipProps) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <button
      className={clsx(
        className,
        'text-in-body-14-r text-in-primary-06 bg-in-primary-02 rounded-in-full flex h-[1.5rem] items-center overflow-hidden px-3',
        !disabled && 'gap-x-1',
        disabled && 'cursor-not-allowed',
      )}
      aria-label={ariaLabel ?? `${label} 제거`}
      disabled={disabled}
      type='button'
      onClick={handleClick}
      title={label}
    >
      <span className='truncate'>{label}</span>
      {!disabled && <Icon className='text-[0.75rem]' iconKey='x' aria-hidden />}
    </button>
  );
};

export default Chip;
