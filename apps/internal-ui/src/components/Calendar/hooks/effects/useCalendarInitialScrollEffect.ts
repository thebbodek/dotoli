import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useEffect, useRef } from 'react';

import { useCalendarContext } from '@/components/Calendar/context';
import {
  CalendarContextValue,
  CalendarMonth,
  CalendarProps,
  CalendarYear,
  UseCalendarInitialScrollEffectProps,
} from '@/components/Calendar/types';

dayjs.extend(isSameOrAfter);

const useCalendarInitialScrollEffect = ({
  monthlyRefs,
  minDate,
  setYear,
}: UseCalendarInitialScrollEffectProps) => {
  const isMountedRef = useRef(false);
  const { value } = useCalendarContext();

  const scrollToMonth = ({ month }: { month: CalendarMonth }) => {
    if (!monthlyRefs.current[month]) return;

    monthlyRefs.current[month].scrollIntoView({
      behavior: 'instant',
      block: 'start',
    });
  };

  const handleScroll = ({
    year,
    month,
  }: {
    year: CalendarYear;
    month: CalendarMonth;
  }) => {
    setYear(year);
    scrollToMonth({ month });
  };

  const getScrollTarget = ({
    value,
    minDate,
  }: Pick<CalendarProps, 'minDate'> & Pick<CalendarContextValue, 'value'>) => {
    if (value && value.startDate) {
      const { startDate } = value;

      return {
        year: dayjs(startDate).year(),
        month: dayjs(startDate).month(),
      };
    }

    const today = dayjs();
    const minDateDayjs = dayjs(minDate);
    const isSameOrAfterToday = today.isSameOrAfter(minDateDayjs, 'day');
    const _year = isSameOrAfterToday ? today.year() : minDateDayjs.year();
    const _month = isSameOrAfterToday ? today.month() : minDateDayjs.month();

    return {
      year: _year,
      month: _month,
    };
  };

  useEffect(() => {
    if (isMountedRef.current) return;

    isMountedRef.current = true;

    const { year, month } = getScrollTarget({ value, minDate });

    handleScroll({
      year,
      month,
    });
  }, []);
};

export default useCalendarInitialScrollEffect;
