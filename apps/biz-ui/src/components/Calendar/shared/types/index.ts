import { CALENDAR_WEEK_START_DAYS } from '@/components/Calendar/shared/constants';

export interface CalendarMonthValue {
  year: number;
  month: number;
}

export interface FormatCalendarYearProps
  extends Pick<CalendarMonthValue, 'year'> {}

export interface FormatCalendarDateLabelProps extends CalendarMonthValue {
  date: number;
}

export type CalendarWeekStartDay =
  (typeof CALENDAR_WEEK_START_DAYS)[keyof typeof CALENDAR_WEEK_START_DAYS];
