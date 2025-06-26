import clsx from 'clsx';
import { MouseEvent } from 'react';

import { Icon } from '@/components/Icon';
import { useSelectTriggerContext } from '@/components/Select/shared';
import { SortTriggerProps } from '@/components/Sort/types';
import { Typography } from '@/components/Typography';

const SortTrigger = ({ displayValue, className }: SortTriggerProps) => {
  const { ref, isOpen, onToggle, disabled } = useSelectTriggerContext();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    onToggle();
  };

  return (
    <div
      ref={ref}
      role='button'
      className={clsx(
        className,
        'rounded-8 flex h-8 w-full items-center justify-between gap-x-2 overflow-hidden border px-4 py-2',
        !disabled && 'border-primary-05 bg-white',
        disabled && 'bg-gray-02 border-gray-04 cursor-not-allowed',
      )}
      aria-disabled={disabled}
      onClick={onClick}
    >
      <div
        className={clsx(
          'flex-h-stack-center gap-x-1',
          disabled ? 'text-gray-04' : 'text-primary-05',
        )}
      >
        <Icon iconKey={'sort-ascending'} className='text-[1rem]' aria-hidden />
        <Typography variant={'body-14-m'}>{displayValue}</Typography>
      </div>
      <Icon
        iconKey={isOpen ? 'caret-up' : 'caret-down'}
        className='text-primary-04 text-[0.562rem]'
        weight='fill'
        aria-hidden
      />
    </div>
  );
};

export default SortTrigger;
