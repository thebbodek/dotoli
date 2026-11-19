import { CALENDAR_DAY_STATUS_WEEKDAY_SUFFIX } from '@/components/Calendar/CalendarDayStatus/constants';
import { GenerateCalendarDayStatusSrLabelProps } from '@/components/Calendar/CalendarDayStatus/types';
import { CALENDAR_DATE_SUFFIX } from '@/components/Calendar/shared/constants';

export const generateCalendarDayStatusSrLabel = ({
  day,
  date,
  statusLabel,
}: GenerateCalendarDayStatusSrLabelProps) => {
  return [
    date !== undefined && `${date}${CALENDAR_DATE_SUFFIX}`,
    `${day}${CALENDAR_DAY_STATUS_WEEKDAY_SUFFIX}`,
    statusLabel,
  ]
    .filter(Boolean)
    .join(' ');
};
