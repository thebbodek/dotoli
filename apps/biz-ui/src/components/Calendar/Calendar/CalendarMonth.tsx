import {
  CALENDAR_EMPTY_DAY_STYLE,
  CALENDAR_MONTH_LABEL_COLOR,
  CALENDAR_MONTH_STYLE,
  CALENDAR_WEEK_STYLE,
  CALENDAR_WEEKS_STYLE,
} from '@/components/Calendar/Calendar/constants';
import { CalendarMonthProps } from '@/components/Calendar/Calendar/types';
import {
  generateCalendarMonthWeeks,
  resolveCalendarSelectedType,
} from '@/components/Calendar/Calendar/utils';
import { CalendarDayButton } from '@/components/Calendar/CalendarDayButton';
import {
  CALENDAR_MONTH_SUFFIX,
  formatCalendarDateLabel,
  formatCalendarYear,
} from '@/components/Calendar/shared';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const CalendarMonth = ({
  year,
  month,
  selectedDates,
  holidaySet,
  disabledSet,
  useRange,
  onDateClick,
}: CalendarMonthProps) => {
  const weeks = generateCalendarMonthWeeks({ year, month });

  return (
    <div className={CALENDAR_MONTH_STYLE}>
      <Typography
        color={CALENDAR_MONTH_LABEL_COLOR}
        variant={TYPOGRAPHY_VARIANTS.HEADING_5}
      >
        {`${formatCalendarYear({ year })} ${month}${CALENDAR_MONTH_SUFFIX}`}
      </Typography>
      <div className={CALENDAR_WEEKS_STYLE}>
        {weeks.map((week, weekIndex) => (
          <div className={CALENDAR_WEEK_STYLE} key={weekIndex}>
            {week.map((cell, cellIndex) =>
              cell ? (
                <CalendarDayButton
                  aria-label={formatCalendarDateLabel({
                    year,
                    month,
                    date: cell.date,
                  })}
                  selectedType={resolveCalendarSelectedType({
                    dateString: cell.dateString,
                    selectedDates,
                    useRange,
                  })}
                  date={cell.date}
                  disabled={disabledSet.has(cell.dateString)}
                  isHoliday={cell.isWeekend || holidaySet.has(cell.dateString)}
                  key={cell.dateString}
                  onClick={() => onDateClick?.({ dateString: cell.dateString })}
                />
              ) : (
                <div className={CALENDAR_EMPTY_DAY_STYLE} key={cellIndex} />
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarMonth;
