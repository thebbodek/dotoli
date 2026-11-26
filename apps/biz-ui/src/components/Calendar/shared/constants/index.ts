import { CalendarWeekStartDay } from '@/components/Calendar/shared/types';

export const CALENDAR_YEAR_DIGITS = 2;

export const CALENDAR_YEAR_SUFFIX = '년';

export const CALENDAR_MONTH_SUFFIX = '월';

export const CALENDAR_DATE_SUFFIX = '일';

export const CALENDAR_DATE_FORMAT = 'YYYY-MM-DD';

export const CALENDAR_WEEKDAY_COUNT = 7;

export const CALENDAR_WEEKEND_DAYS: readonly number[] = [0, 6];

export const CALENDAR_MONTH_INDEX_OFFSET = 1;

export const CALENDAR_WEEK_START_DAYS = {
  SUNDAY: 'sunday',
  MONDAY: 'monday',
} as const;

export const CALENDAR_WEEK_START_DAY_INDEXES: Record<
  CalendarWeekStartDay,
  number
> = {
  [CALENDAR_WEEK_START_DAYS.SUNDAY]: 0,
  [CALENDAR_WEEK_START_DAYS.MONDAY]: 1,
};
