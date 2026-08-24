import {
  CALENDAR_DATE_SUFFIX,
  CALENDAR_MONTH_SUFFIX,
  CALENDAR_YEAR_SUFFIX,
} from '@/components/Calendar/shared/constants';
import { FormatCalendarDateLabelProps } from '@/components/Calendar/shared/types';

export const formatCalendarDateLabel = ({
  year,
  month,
  date,
}: FormatCalendarDateLabelProps) =>
  `${year}${CALENDAR_YEAR_SUFFIX} ${month}${CALENDAR_MONTH_SUFFIX} ${date}${CALENDAR_DATE_SUFFIX}`;
