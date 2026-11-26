import { CALENDAR_WEEK_START_DAY_INDEXES } from '@/components/Calendar/shared';
import { STICKY_CALENDAR_WEEKDAYS } from '@/components/Calendar/StickyCalendar/constants';
import { RotateStickyCalendarWeekdaysProps } from '@/components/Calendar/StickyCalendar/types';

export const rotateStickyCalendarWeekdays = ({
  weekStartDay,
}: RotateStickyCalendarWeekdaysProps) => {
  const startIndex = CALENDAR_WEEK_START_DAY_INDEXES[weekStartDay];

  return [
    ...STICKY_CALENDAR_WEEKDAYS.slice(startIndex),
    ...STICKY_CALENDAR_WEEKDAYS.slice(0, startIndex),
  ];
};
