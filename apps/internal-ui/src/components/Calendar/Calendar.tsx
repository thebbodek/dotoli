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
      id={id}
      aria-labelledby={labelId}
      className={clsx(
        className,
        'in-flex-v-stack in-tablet:p-[0.875rem] overflow-hidden p-4',
      )}
    >
      <CalendarNavigator onYearChange={onYearChange} year={year} />
      <div role='grid' className='in-flex-v-stack items-center overflow-hidden'>
        <CalendarWeeks />
        <div
          ref={monthlyWrapperRef}
          role='presentation'
          className='in-flex-v-stack gap-y-2.5 overflow-y-scroll'
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
                    key={`${month}-${daysIndex}`}
                    month={month}
                    daysIndex={daysIndex}
                    daysOfMonth={daysOfMonth}
                    handleClick={handleClick}
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
