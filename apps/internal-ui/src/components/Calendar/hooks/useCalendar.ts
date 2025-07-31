import { year as dateYear } from '@bbodek/utils';
import { useRef, useState } from 'react';

import useCalendarDays from '@/components/Calendar/hooks/useCalendarDays';
import useCalendarHandlers from '@/components/Calendar/hooks/useCalendarHandlers';
import {
  CalendarMonthlyRefs,
  CalendarYear,
  UseCalendarProps,
  UseCalendarReturn,
} from '@/components/Calendar/types';

const useCalendar = ({
  minDate,
  maxDate,
  holidays,
  disabledDays,
  externalDaysLabels,
  useWeekend = false,
}: UseCalendarProps): UseCalendarReturn => {
  const monthlyRefs = useRef<CalendarMonthlyRefs>({});
  const monthlyWrapperRef = useRef<HTMLDivElement>(null);
  const [year, setYear] = useState<CalendarYear>(dateYear());
  const { onYearChange, handleClick } = useCalendarHandlers({
    monthlyWrapperRef,
    setYear,
  });
  const { days } = useCalendarDays({
    holidays,
    externalDaysLabels,
    useWeekend,
    year,
    minDate,
    maxDate,
    disabledDays,
  });

  return {
    models: {
      days,
      year,
      monthlyWrapperRef,
      monthlyRefs,
    },
    operations: { setYear, onYearChange, handleClick },
  };
};

export default useCalendar;
