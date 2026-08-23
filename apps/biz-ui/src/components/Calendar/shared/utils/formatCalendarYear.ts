import {
  CALENDAR_YEAR_DIGITS,
  CALENDAR_YEAR_SUFFIX,
} from '@/components/Calendar/shared/constants';
import { FormatCalendarYearProps } from '@/components/Calendar/shared/types';

export const formatCalendarYear = ({ year }: FormatCalendarYearProps) => {
  const shortYear = year % 10 ** CALENDAR_YEAR_DIGITS;

  return `${String(shortYear).padStart(CALENDAR_YEAR_DIGITS, '0')}${CALENDAR_YEAR_SUFFIX}`;
};
