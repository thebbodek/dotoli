import clsx from 'clsx';

import CalendarMonth from '@/components/Calendar/Calendar/CalendarMonth';
import { CALENDAR_BASE_STYLE } from '@/components/Calendar/Calendar/constants';
import { CalendarProps } from '@/components/Calendar/Calendar/types';
import { CALENDAR_WEEK_START_DAYS } from '@/components/Calendar/shared';

const Calendar = ({
  months,
  selectedDates,
  holidays,
  disabledDates,
  useRange = false,
  weekStartDay = CALENDAR_WEEK_START_DAYS.SUNDAY,
  className,
  onDateClick,
}: CalendarProps) => {
  const holidaySet = new Set(holidays);
  const disabledSet = new Set(disabledDates);

  return (
    <div className={clsx(className, CALENDAR_BASE_STYLE)}>
      {months.map(({ year, month }) => (
        <CalendarMonth
          disabledSet={disabledSet}
          holidaySet={holidaySet}
          key={`${year}-${month}`}
          month={month}
          selectedDates={selectedDates}
          useRange={useRange}
          weekStartDay={weekStartDay}
          year={year}
          onDateClick={onDateClick}
        />
      ))}
    </div>
  );
};

export default Calendar;
