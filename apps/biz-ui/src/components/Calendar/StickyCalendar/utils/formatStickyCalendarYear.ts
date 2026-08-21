import {
  STICKY_CALENDAR_YEAR_DIGITS,
  STICKY_CALENDAR_YEAR_SUFFIX,
} from '@/components/Calendar/StickyCalendar/constants';
import { FormatStickyCalendarYearProps } from '@/components/Calendar/StickyCalendar/types';

export const formatStickyCalendarYear = ({
  year,
}: FormatStickyCalendarYearProps) => {
  const shortYear = year % 10 ** STICKY_CALENDAR_YEAR_DIGITS;

  return `${String(shortYear).padStart(STICKY_CALENDAR_YEAR_DIGITS, '0')}${STICKY_CALENDAR_YEAR_SUFFIX}`;
};
