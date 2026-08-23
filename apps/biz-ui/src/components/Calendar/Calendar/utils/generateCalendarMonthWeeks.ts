import dayjs from 'dayjs';

import { GenerateCalendarMonthWeeksProps } from '@/components/Calendar/Calendar/types';
import {
  CALENDAR_DATE_FORMAT,
  CALENDAR_MONTH_INDEX_OFFSET,
  CALENDAR_WEEKDAY_COUNT,
  CALENDAR_WEEKEND_DAYS,
} from '@/components/Calendar/shared';

export const generateCalendarMonthWeeks = ({
  year,
  month,
}: GenerateCalendarMonthWeeksProps) => {
  const firstDate = dayjs(
    new Date(year, month - CALENDAR_MONTH_INDEX_OFFSET, 1),
  );
  const leadingCount = firstDate.day();
  const dateCount = firstDate.daysInMonth();

  const cells = [
    ...Array.from({ length: leadingCount }, () => null),
    ...Array.from({ length: dateCount }, (_, index) => {
      const current = firstDate.date(index + 1);

      return {
        date: index + 1,
        dateString: current.format(CALENDAR_DATE_FORMAT),
        isWeekend: CALENDAR_WEEKEND_DAYS.includes(current.day()),
      };
    }),
  ];

  return Array.from(
    { length: Math.ceil(cells.length / CALENDAR_WEEKDAY_COUNT) },
    (_, weekIndex) =>
      cells.slice(
        weekIndex * CALENDAR_WEEKDAY_COUNT,
        (weekIndex + 1) * CALENDAR_WEEKDAY_COUNT,
      ),
  );
};
