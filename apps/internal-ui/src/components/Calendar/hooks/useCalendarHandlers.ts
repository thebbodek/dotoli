import { toString } from '@bbodek/utils';
import { useCallback, useMemo } from 'react';

import {
  CALENDAR_NAVIGATE_TYPE,
  CALENDAR_VARIANTS,
} from '@/components/Calendar/constants';
import { useCalendarContext } from '@/components/Calendar/context';
import {
  CalendarDateStringParams,
  CalendarYearChangeParams,
  UseCalendarHandlersProps,
  UseCalendarHandlersReturn,
} from '@/components/Calendar/types';
import { getDateValue, getIsSameStartDate } from '@/components/Calendar/utils';

const useCalendarHandlers = ({
  monthlyWrapperRef,
  setYear,
}: UseCalendarHandlersProps): UseCalendarHandlersReturn => {
  const { setInternalValue, variant } = useCalendarContext();

  const handleSingleClick = useCallback(
    ({ dateString }: CalendarDateStringParams) => {
      setInternalValue((prev) => {
        if (getIsSameStartDate({ dateString, internalValue: prev })) {
          return prev;
        }

        const dateValue = getDateValue({ dateString });

        return { startDate: dateValue, endDate: dateValue };
      });
    },
    [setInternalValue],
  );

  const handleRangeClick = useCallback(
    ({ dateString }: CalendarDateStringParams) => {
      setInternalValue((prev) => {
        const dateValue = getDateValue({ dateString });

        if (!prev) return { startDate: dateValue, endDate: null };

        const { startDate, endDate } = prev;

        if (startDate !== null && endDate === null) {
          const startDateString = toString({ date: startDate });

          if (dateString === startDateString) {
            return { startDate: dateValue, endDate: dateValue };
          }

          return dateString < startDateString
            ? { startDate: dateValue, endDate: startDate }
            : { startDate, endDate: dateValue };
        }

        return { startDate: dateValue, endDate: null };
      });
    },
    [setInternalValue],
  );

  const handleUnboundedClick = useCallback(
    ({ dateString }: CalendarDateStringParams) => {
      setInternalValue((prev) => {
        if (getIsSameStartDate({ dateString, internalValue: prev })) {
          return prev;
        }

        return { startDate: getDateValue({ dateString }), endDate: null };
      });
    },
    [setInternalValue],
  );

  const handleDateClick = useMemo(
    () => ({
      [CALENDAR_VARIANTS.SINGLE]: handleSingleClick,
      [CALENDAR_VARIANTS.RANGE]: handleRangeClick,
      [CALENDAR_VARIANTS.UNBOUNDED]: handleUnboundedClick,
    }),
    [handleSingleClick, handleRangeClick, handleUnboundedClick],
  );

  const handleClick = useCallback(
    ({ dateString }: CalendarDateStringParams) => {
      handleDateClick[variant]({ dateString });
    },
    [variant, handleDateClick],
  );

  const onYearChange = useCallback(
    ({ navigateType }: CalendarYearChangeParams) => {
      if (navigateType === CALENDAR_NAVIGATE_TYPE.PREV) {
        setYear((prev) => prev! - 1);
      }

      if (navigateType === CALENDAR_NAVIGATE_TYPE.NEXT) {
        setYear((prev) => prev! + 1);
      }

      monthlyWrapperRef.current?.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    },
    [monthlyWrapperRef, setYear],
  );

  return {
    handleClick,
    onYearChange,
  };
};

export default useCalendarHandlers;
