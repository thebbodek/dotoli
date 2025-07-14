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
    ({ date }: Pick<CalendarDaysOfMonth, 'date'>) => {
      if (isStart({ date })) return;

      setInternalValue({ startDate: date, endDate: date });
    },
    [isStart],
  );

  const handleRangeClick = useCallback(
    ({ date }: Pick<CalendarDaysOfMonth, 'date'>) => {
      if (!internalValue) {
        return setInternalValue({
          startDate: date,
          endDate: null,
        });
      }

      const { startDate, endDate } = internalValue;

      if (startDate && !endDate) {
        if (isStart({ date })) {
          return setInternalValue({ startDate: date, endDate: date });
        }

        const isBeforeStartDate = date.isBefore(startDate);

        return setInternalValue(() =>
          isBeforeStartDate
            ? { startDate: date, endDate: startDate }
            : { startDate, endDate: date },
        );
      }

      if (startDate && endDate && (isEnd({ date }) || isStart({ date }))) {
        return setInternalValue({ startDate: date, endDate: null });
      }

      return setInternalValue({
        startDate: date,
        endDate: null,
      });
    },
    [internalValue, isStart, isEnd],
  );

  const handleUnboundedClick = useCallback(
    ({ date }: Pick<CalendarDaysOfMonth, 'date'>) => {
      if (isStart({ date })) return;

      setInternalValue({ startDate: date, endDate: null });
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
    ({ date }: Pick<CalendarDaysOfMonth, 'date'>) => {
      if (isDisabled({ date })) return;

      handleDateClick[variant]({ date });
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
