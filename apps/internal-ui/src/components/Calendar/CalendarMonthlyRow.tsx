import { memo } from 'react';

import CalendarDay from '@/components/Calendar/CalendarDay';
import CalendarEmptyDay from '@/components/Calendar/CalendarEmptyDay';
import CalendarWeekly from '@/components/Calendar/CalendarWeekly';
import {
  CALENDAR_WEEKS_ARRAY,
  CALENDAR_WEEKS_COUNT,
} from '@/components/Calendar/constants';
import { CalendarMonthlyRowProps } from '@/components/Calendar/types';

const CalendarMonthlyRow = ({
  month,
  daysIndex,
  daysOfMonth,
  handleClick,
}: CalendarMonthlyRowProps) => {
  return (
    <CalendarWeekly className='grid-rows-[2.8125rem]'>
      {CALENDAR_WEEKS_ARRAY.map((weekIndex) => {
        const dayIndex = daysIndex * CALENDAR_WEEKS_COUNT + weekIndex;
        const snapshot = daysOfMonth[dayIndex];

        if (snapshot === null) {
          return <CalendarEmptyDay key={`${month}-${dayIndex}`} />;
        }

        const { date, key, ...rest } = snapshot;

        return (
          <CalendarDay
            key={key}
            onClick={() => handleClick({ date })}
            {...rest}
          />
        );
      })}
    </CalendarWeekly>
  );
};

export default memo(CalendarMonthlyRow);
