import { useCallback } from 'react';

import { CALENDAR_VARIANTS } from '@/components/Calendar/constants';
import { useCalendarContext } from '@/components/Calendar/context';
import { CalendarDateStringParams } from '@/components/Calendar/types';

const useCalendarValidUtils = () => {
  const { internalValueStrings, variant } = useCalendarContext();
  const { startDateString, endDateString } = internalValueStrings;

  const isStart = useCallback(
    ({ dateString }: CalendarDateStringParams) =>
      startDateString !== null && dateString === startDateString,
    [startDateString],
  );

  const isEnd = useCallback(
    ({ dateString }: CalendarDateStringParams) =>
      endDateString !== null && dateString === endDateString,
    [endDateString],
  );

  const isSelected = useCallback(
    ({ dateString }: CalendarDateStringParams) => {
      if (startDateString === null && endDateString === null) return false;

      if (variant === CALENDAR_VARIANTS.SINGLE) {
        return dateString === startDateString && dateString === endDateString;
      }

      if (variant === CALENDAR_VARIANTS.RANGE) {
        if (startDateString !== null && endDateString === null) {
          return dateString === startDateString;
        }

        if (startDateString !== null && endDateString !== null) {
          return dateString >= startDateString && dateString <= endDateString;
        }

        return false;
      }

      if (variant === CALENDAR_VARIANTS.UNBOUNDED && startDateString !== null) {
        return dateString >= startDateString;
      }

      return false;
    },
    [startDateString, endDateString, variant],
  );

  return {
    isStart,
    isEnd,
    isSelected,
  };
};

export default useCalendarValidUtils;
