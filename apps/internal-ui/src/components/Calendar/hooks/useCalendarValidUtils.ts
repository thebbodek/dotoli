import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useCallback } from 'react';

import { CALENDAR_VARIANTS } from '@/components/Calendar/constants';
import { useCalendarContext } from '@/components/Calendar/context';
import {
  CalendarDateValue,
  CalendarDaysOfMonth,
  CalendarProps,
} from '@/components/Calendar/types';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

const useCalendarValidUtils = () => {
  const { internalValue, variant } = useCalendarContext();
  const { startDate = null, endDate = null } = internalValue ?? {};

  const isHoliday = useCallback(
    ({
      date,
      holidaysSet,
    }: Pick<CalendarDaysOfMonth, 'date'> & {
      holidaysSet: Set<CalendarDateValue>;
    }) => holidaysSet.has(date.format('YYYY-MM-DD')),
    [],
  );

  const isStart = useCallback(
    ({ date }: Pick<CalendarDaysOfMonth, 'date'>) =>
      startDate?.isSame(date, 'day') ?? false,
    [startDate],
  );

  const isEnd = useCallback(
    ({ date }: Pick<CalendarDaysOfMonth, 'date'>) =>
      endDate?.isSame(date, 'day') ?? false,
    [endDate],
  );

  const isSelected = useCallback(
    ({ date }: Pick<CalendarDaysOfMonth, 'date'>) => {
      if (!startDate && !endDate) return false;

      if (variant === CALENDAR_VARIANTS.SINGLE && startDate && endDate) {
        return date.isSame(startDate, 'day') && date.isSame(endDate, 'day');
      }

      if (variant === CALENDAR_VARIANTS.RANGE) {
        if (startDate && endDate === null) {
          return date.isSame(startDate, 'day');
        }

        if (startDate && endDate) {
          return date.isBetween(startDate, endDate, 'day', '[]');
        }

        return false;
      }

      if (variant === CALENDAR_VARIANTS.UNBOUNDED && startDate) {
        return date.isSameOrAfter(startDate, 'day');
      }

      return false;
    },
    [startDate, endDate, variant],
  );

  const isDisabled = useCallback(
    ({
      date,
      minDate,
      maxDate,
      disabledDays,
    }: Pick<CalendarDaysOfMonth, 'date'> &
      Pick<CalendarProps, 'minDate' | 'maxDate' | 'disabledDays'>) => {
      let isDisabled =
        disabledDays?.includes(date.format('YYYY-MM-DD')) ?? false;

      if (!isDisabled) {
        if (minDate && maxDate) {
          isDisabled = !date.isBetween(
            dayjs(minDate),
            dayjs(maxDate),
            'day',
            '[]',
          );
        }

        if (minDate && !maxDate && date.isBefore(dayjs(minDate), 'day')) {
          isDisabled = true;
        }

        if (maxDate && !minDate && date.isAfter(dayjs(maxDate), 'day')) {
          isDisabled = true;
        }
      }

      return isDisabled;
    },
    [],
  );

  return {
    isHoliday,
    isStart,
    isEnd,
    isSelected,
    isDisabled,
  };
};

export default useCalendarValidUtils;
