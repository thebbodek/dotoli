import { isAfter, isBefore, isBetween, isSame, toString } from '@bbodek/utils';
import { useCallback } from 'react';

import { CALENDAR_VARIANTS } from '@/components/Calendar/constants';
import { useCalendarContext } from '@/components/Calendar/context';
import {
  CalendarDateValue,
  CalendarDaysOfMonth,
  CalendarProps,
} from '@/components/Calendar/types';

const useCalendarValidUtils = () => {
  const { internalValue, variant } = useCalendarContext();
  const { startDate = null, endDate = null } = internalValue ?? {};

  const isHoliday = useCallback(
    ({
      dateValue,
      holidaysSet,
    }: Pick<CalendarDaysOfMonth, 'dateValue'> & {
      holidaysSet: Set<CalendarDateValue>;
    }) => holidaysSet.has(toString({ date: dateValue })),
    [],
  );

  const isStart = useCallback(
    ({ dateValue }: Pick<CalendarDaysOfMonth, 'dateValue'>) =>
      startDate !== null
        ? isSame({ date: dateValue, target: startDate })
        : false,
    [startDate],
  );

  const isEnd = useCallback(
    ({ dateValue }: Pick<CalendarDaysOfMonth, 'dateValue'>) =>
      endDate !== null ? isSame({ date: dateValue, target: endDate }) : false,
    [endDate],
  );

  const isSelected = useCallback(
    ({ dateValue }: Pick<CalendarDaysOfMonth, 'dateValue'>) => {
      if (!startDate && !endDate) return false;

      if (variant === CALENDAR_VARIANTS.SINGLE && startDate && endDate) {
        return (
          isSame({ date: dateValue, target: startDate }) &&
          isSame({ date: dateValue, target: endDate })
        );
      }

      if (variant === CALENDAR_VARIANTS.RANGE) {
        if (startDate && endDate === null) {
          return isSame({ date: dateValue, target: startDate });
        }

        if (startDate && endDate) {
          return isBetween({
            date: dateValue,
            from: startDate,
            to: endDate,
          });
        }

        return false;
      }

      if (variant === CALENDAR_VARIANTS.UNBOUNDED && startDate) {
        return isAfter({
          date: dateValue,
          target: startDate,
          isInclude: true,
        });
      }

      return false;
    },
    [startDate, endDate, variant],
  );

  const isDisabled = useCallback(
    ({
      dateValue,
      minDate,
      maxDate,
      disabledDays,
    }: Pick<CalendarDaysOfMonth, 'dateValue'> &
      Pick<CalendarProps, 'minDate' | 'maxDate' | 'disabledDays'>) => {
      let isDisabled =
        disabledDays?.includes(toString({ date: dateValue })) ?? false;

      if (!isDisabled) {
        if (minDate && maxDate) {
          isDisabled = !isBetween({
            date: dateValue,
            from: minDate,
            to: maxDate,
          });
        }

        if (
          minDate &&
          !maxDate &&
          isBefore({
            date: dateValue,
            target: minDate,
          })
        ) {
          isDisabled = true;
        }

        if (
          maxDate &&
          !minDate &&
          isAfter({
            date: dateValue,
            target: maxDate,
          })
        ) {
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
