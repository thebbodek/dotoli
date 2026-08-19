import { CALENDAR_WEEKS_COUNT } from '@/components/Calendar/constants';
import {
  CalendarWeeksValues,
  GetWeekIndexParams,
} from '@/components/Calendar/types';

export const getWeekIndex = ({ index }: GetWeekIndexParams) =>
  (index % CALENDAR_WEEKS_COUNT) as CalendarWeeksValues;
