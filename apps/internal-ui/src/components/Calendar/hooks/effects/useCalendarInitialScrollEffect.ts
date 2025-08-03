import { isAfter, month, now, toParseDateType, year } from '@bbodek/utils';
import { useEffect, useRef } from 'react';

import { useCalendarContext } from '@/components/Calendar/context';
import {
  CalendarContextValue,
  CalendarProps,
  HandleScrollParams,
  ScrollToMonthParams,
  UseCalendarInitialScrollEffectProps,
} from '@/components/Calendar/types';

const useCalendarInitialScrollEffect = ({
  monthlyRefs,
  minDate,
  setYear,
}: UseCalendarInitialScrollEffectProps) => {
  const isMountedRef = useRef(false);
  const { value } = useCalendarContext();

  const scrollToMonth = ({ month }: ScrollToMonthParams) => {
    if (!monthlyRefs.current[month]) return;

    monthlyRefs.current[month].scrollIntoView({
      behavior: 'instant',
      block: 'start',
    });
  };

  const handleScroll = ({ year, month }: HandleScrollParams) => {
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
        year: year({ date: startDate }),
        month: month({ date: startDate }),
      };
    }

    const today = now();
    const minDateDayjs = toParseDateType({ type: 'dayjs', date: minDate });
    const isSameOrAfterToday = isAfter({
      date: today,
      target: minDateDayjs,
      isInclude: true,
    });
    const _year = isSameOrAfterToday
      ? year({ date: today })
      : year({ date: minDateDayjs });
    const _month = isSameOrAfterToday
      ? month({ date: today })
      : month({ date: minDateDayjs });

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
