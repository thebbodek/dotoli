import clsx from 'clsx';
import { memo } from 'react';

import {
  CALENDAR_DAY_DISABLED_VARIANTS,
  CALENDAR_DAY_SELECTED_VARIANTS,
  CALENDAR_DAY_STYLES,
} from '@/components/Calendar/constants';
import { CalendarDayProps } from '@/components/Calendar/types';
import { Typography } from '@/components/Typography';

const CalendarDay = ({ day, label, variant, onClick }: CalendarDayProps) => {
  const { COLOR, BACKGROUND, VARIANT, ROUNDED } = CALENDAR_DAY_STYLES[variant];
  const isSelected = CALENDAR_DAY_SELECTED_VARIANTS.includes(variant);
  const isDisabled = CALENDAR_DAY_DISABLED_VARIANTS.includes(variant);
  const showLabel = !!label && !isSelected;

  return (
    <button
      className={clsx(
        'in-flex-v-stack overflow-hidden pt-3',
        isDisabled && 'cursor-not-allowed',
        BACKGROUND,
        ROUNDED,
      )}
      role='gridcell'
      aria-selected={isSelected}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
    >
      <Typography color={COLOR} variant={VARIANT}>
        {day}
      </Typography>
      {showLabel && (
        <Typography color={COLOR} className='text-[0.625rem] leading-none'>
          {label}
        </Typography>
      )}
    </button>
  );
};

export default memo(CalendarDay);
