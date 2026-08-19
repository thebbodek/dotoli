import { memo } from 'react';

import CalendarDay from '@/components/Calendar/CalendarDay';
import CalendarEmptyDay from '@/components/Calendar/CalendarEmptyDay';
import CalendarWeekly from '@/components/Calendar/CalendarWeekly';
import {
  CALENDAR_WEEKS_ARRAY,
  CALENDAR_WEEKS_COUNT,
} from '@/components/Calendar/constants';
import { useCalendarContext } from '@/components/Calendar/context';
import useCalendarValidUtils from '@/components/Calendar/hooks/useCalendarValidUtils';
import { CalendarMonthlyRowProps } from '@/components/Calendar/types';
import { getDayVariant } from '@/components/Calendar/utils';

const CalendarMonthlyRow = ({
  month,
  daysIndex,
  daysOfMonth,
  handleClick,
  useWeekend = false,
}: CalendarMonthlyRowProps) => {
  const { variant } = useCalendarContext();
  const { isSelected, isStart, isEnd } = useCalendarValidUtils();

  return (
    <CalendarWeekly className='grid-rows-[2.8125rem]'>
      {CALENDAR_WEEKS_ARRAY.map((weekIndex) => {
        const dayIndex = daysIndex * CALENDAR_WEEKS_COUNT + weekIndex;
        const snapshot = daysOfMonth[dayIndex];

        if (snapshot === null) {
          return <CalendarEmptyDay key={`${month}-${dayIndex}`} />;
        }

        const {
          key,
          dateString,
          week,
          isDisabled,
          isHoliday,
          isToday,
          ...rest
        } = snapshot;

        return (
          <CalendarDay
            variant={getDayVariant({
              week,
              useWeekend,
              variant,
              isDisabled,
              isHoliday,
              isToday,
              isSelected: isSelected({ dateString }),
              isStart: isStart({ dateString }),
              isEnd: isEnd({ dateString }),
            })}
            dateString={dateString}
            key={key}
            onClick={handleClick}
            {...rest}
          />
        );
      })}
    </CalendarWeekly>
  );
};

export default memo(CalendarMonthlyRow);
