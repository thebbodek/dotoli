import { isBefore } from '@bbodek/utils';
import { useCallback, useMemo } from 'react';

import {
  CALENDAR_NAVIGATE_TYPE,
  CALENDAR_VARIANTS,
} from '@/components/Calendar/constants';
import { useCalendarContext } from '@/components/Calendar/context';
import useCalendarValidUtils from '@/components/Calendar/hooks/useCalendarValidUtils';
import {
  CalendarDaysOfMonth,
  CalendarYearChangeParams,
  UseCalendarHandlersProps,
  UseCalendarHandlersReturn,
} from '@/components/Calendar/types';

const useCalendarHandlers = ({
  monthlyWrapperRef,
  setYear,
}: UseCalendarHandlersProps): UseCalendarHandlersReturn => {
  const { internalValue, setInternalValue, variant } = useCalendarContext();
  const { isStart, isDisabled, isEnd } = useCalendarValidUtils();

  const handleSingleClick = useCallback(
    ({ dateValue }: Pick<CalendarDaysOfMonth, 'dateValue'>) => {
      if (isStart({ dateValue })) return;

      setInternalValue({ startDate: dateValue, endDate: dateValue });
    },
    [isStart],
  );

  const handleRangeClick = useCallback(
    ({ dateValue }: Pick<CalendarDaysOfMonth, 'dateValue'>) => {
      if (!internalValue) {
        return setInternalValue({
          startDate: dateValue,
          endDate: null,
        });
      }

      const { startDate, endDate } = internalValue;

      if (startDate && !endDate) {
        if (isStart({ dateValue })) {
          return setInternalValue({ startDate: dateValue, endDate: dateValue });
        }

        const isBeforeStartDate = isBefore({
          date: dateValue,
          target: startDate,
        });

        return setInternalValue(() =>
          isBeforeStartDate
            ? { startDate: dateValue, endDate: startDate }
            : { startDate, endDate: dateValue },
        );
      }

      if (
        startDate &&
        endDate &&
        (isEnd({ dateValue }) || isStart({ dateValue }))
      ) {
        return setInternalValue({ startDate: dateValue, endDate: null });
      }

      return setInternalValue({
        startDate: dateValue,
        endDate: null,
      });
    },
    [internalValue, isStart, isEnd],
  );

  const handleUnboundedClick = useCallback(
    ({ dateValue }: Pick<CalendarDaysOfMonth, 'dateValue'>) => {
      if (isStart({ dateValue })) return;

      setInternalValue({ startDate: dateValue, endDate: null });
    },
    [isStart],
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
    ({ dateValue }: Pick<CalendarDaysOfMonth, 'dateValue'>) => {
      if (isDisabled({ dateValue })) return;

      handleDateClick[variant]({ dateValue });
    },
    [variant, handleDateClick, isDisabled],
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
    [monthlyWrapperRef.current],
  );

  return {
    handleClick,
    onYearChange,
  };
};

export default useCalendarHandlers;
