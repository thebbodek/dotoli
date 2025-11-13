import clsx from 'clsx';

import CalendarMonth from '@/components/Calendar/CalendarMonth';
import CalendarMonthly from '@/components/Calendar/CalendarMonthly';
import CalendarMonthlyRow from '@/components/Calendar/CalendarMonthlyRow';
import CalendarNavigator from '@/components/Calendar/CalendarNavigator';
import CalendarWeeks from '@/components/Calendar/CalendarWeeks';
import {
  CALENDAR_DAYS_ARRAY,
  CALENDAR_MONTHLY_ARRAY,
} from '@/components/Calendar/constants';
import { useCalendar } from '@/components/Calendar/hooks';
import {
  useCalendarInitialInternalValueEffect,
  useCalendarInitialScrollEffect,
} from '@/components/Calendar/hooks/effects';
import { CalendarProps } from '@/components/Calendar/types';

const Calendar = ({
  id,
  className,
  labelId,
  minDate,
  maxDate,
  holidays,
  disabledDays,
  externalDaysLabels,
  useWeekend = false,
}: CalendarProps) => {
  const {
    models: { days, monthlyWrapperRef, monthlyRefs, year },
    operations: { onYearChange, handleClick, setYear },
  } = useCalendar({
    minDate,
    maxDate,
    holidays,
    disabledDays,
    externalDaysLabels,
    useWeekend,
  });

  useCalendarInitialInternalValueEffect();

  useCalendarInitialScrollEffect({
    monthlyRefs,
    minDate,
    setYear,
  });

  return (
    <div
      aria-labelledby={labelId}
      className={clsx(className, 'in-flex-v-stack overflow-hidden p-4')}
      id={id}
    >
      <CalendarNavigator year={year} onYearChange={onYearChange} />
      <div className='in-flex-v-stack items-center overflow-hidden' role='grid'>
        <CalendarWeeks />
        <div
          className='in-flex-v-stack gap-y-2.5 overflow-y-scroll'
          ref={monthlyWrapperRef}
          role='presentation'
        >
          {CALENDAR_MONTHLY_ARRAY.map((month) => {
            const daysOfMonth = days.get(month);

            if (!daysOfMonth) return null;

            return (
              <CalendarMonthly
                key={month}
                setRef={(el) => (monthlyRefs.current[month] = el)}
              >
                <CalendarMonth month={month} />
                {CALENDAR_DAYS_ARRAY.map((daysIndex) => (
                  <CalendarMonthlyRow
                    daysIndex={daysIndex}
                    daysOfMonth={daysOfMonth}
                    handleClick={handleClick}
                    key={`${month}-${daysIndex}`}
                    month={month}
                  />
                ))}
              </CalendarMonthly>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
