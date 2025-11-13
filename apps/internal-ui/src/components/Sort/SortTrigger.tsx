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
      className={clsx(
        className,
        'rounded-in-8 flex h-8 w-full items-center justify-between gap-x-1 overflow-hidden border px-4 py-2',
        !disabled && 'border-in-primary-05 bg-white',
        disabled &&
          'bg-in-gray-02 border-in-gray-04 text-in-gray-04 cursor-not-allowed',
      )}
      aria-disabled={disabled}
      ref={ref}
      role='button'
      onClick={onClick}
    >
      <div
        className={clsx(
          'in-flex-h-stack-center gap-x-1 overflow-hidden',
          !disabled && 'text-in-primary-06',
        )}
      >
        <Icon
          className='text-[1rem]'
          iconKey='sort-ascending'
          weight='regular'
          aria-hidden
        />
        <Typography className='truncate' variant='body-14-m'>
          {displayValue}
        </Typography>
      </div>
      <Icon
        className={clsx(
          'shrink-0 text-[0.562rem]',
          !disabled && 'text-in-primary-05',
        )}
        iconKey={isOpen ? 'caret-up' : 'caret-down'}
        weight='fill'
        aria-hidden
      />
    </div>
  );
};

export default SortTrigger;
