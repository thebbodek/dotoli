import { date } from '@bbodek/utils';
import { useEffect, useRef } from 'react';

import { useCalendarContext } from '@/components/Calendar/context';
import {
  CalendarContextValue,
  CalendarMonth,
  CalendarProps,
  CalendarYear,
  UseCalendarInitialScrollEffectProps,
} from '@/components/Calendar/types';

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
        year: date.year({ date: startDate }),
        month: date.month({ date: startDate }),
      };
    }

    const today = date.now();
    const minDateDayjs = date.toParseDateType({ type: 'dayjs', date: minDate });
    const isSameOrAfterToday = date.isAfter({
      date: today,
      target: minDateDayjs,
      isInclude: true,
    });
    const _year = isSameOrAfterToday
      ? date.year({ date: today })
      : date.year({ date: minDateDayjs });
    const _month = isSameOrAfterToday
      ? date.month({ date: today })
      : date.month({ date: minDateDayjs });

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
