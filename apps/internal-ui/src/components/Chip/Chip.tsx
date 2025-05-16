'use client';

import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import { COLOR_STYLES_MAPPER, COLOR_VARIANTS } from '@/variants';
import { ChipProps } from './types';

const Chip = ({
  label,
  onClick,
  disabled,
  className,
  color = COLOR_VARIANTS.PRIMARY_06,
  backgroundColor = COLOR_VARIANTS.PRIMARY_02,
}: ChipProps) => {
  const _className = clsx(
    'text-body-14-r flex h-[1.5rem] items-center gap-x-1 rounded-full px-3',
    COLOR_STYLES_MAPPER.TEXT[color],
    COLOR_STYLES_MAPPER.BACKGROUND[backgroundColor],
    className,
  );

  return (
    <button
      className={_className}
      disabled={disabled}
      type='button'
      onClick={onClick}
    >
      {label}
      <Icon className='text-[0.75rem]' iconKey='x' />
    </button>
  );
};

export default Chip;
