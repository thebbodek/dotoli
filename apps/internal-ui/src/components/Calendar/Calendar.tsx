import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import CalendarDay from '@/components/Calendar/CalendarDay';
import CalendarDays from '@/components/Calendar/CalendarDays';
import CalendarEmptyCell from '@/components/Calendar/CalendarEmptyCell';
import CalendarMonth from '@/components/Calendar/CalendarMonth';
import CalendarMonthly from '@/components/Calendar/CalendarMonthly';
import CalendarNavigator from '@/components/Calendar/CalendarNavigator';
import CalendarWeek from '@/components/Calendar/CalendarWeek';
import CalendarWeeks from '@/components/Calendar/CalendarWeeks';
import CalendarYear from '@/components/Calendar/CalendarYear';
import {
  CALENDAR_DAYS_ARRAY,
  CALENDAR_DAYS_COUNT,
  CALENDAR_MONTHLY_ARRAY,
  CALENDAR_NAVIGATE_TYPE,
  CALENDAR_VARIANTS,
  CALENDAR_WEEKS_ARRAY,
  CALENDAR_WEEKS_COUNT,
  WEEKS,
} from '@/components/Calendar/constants';
import {
  CalendarVariants,
  CalendarWeekWeeks,
  CalendarYearChangeParams,
} from '@/components/Calendar/types';
import { getDayVariant } from '@/components/Calendar/utils';

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);

// value
// minDate
// maxDate
// holidays
// disabledDays
// externalDaysLabels
// variant
// className

const Calendar = ({
  value,
}: {
  value: { startDate: string; endDate: string } | null;
}) => {
  const today = dayjs();
  const isMounted = useRef(false);
  const monthlyWrapperRef = useRef<HTMLDivElement>(null);
  const monthlyRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [year, setYear] = useState(today.year());
  const [internalValue, setInternalValue] = useState<{
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  } | null>(null);
  const minDate: string | undefined = undefined;
  const maxDate: string | undefined = '2026-08-20';
  const holidays: string[] = ['2025-07-16', '2025-07-24', '2025-08-15'];
  const disabledDays: string[] = ['2025-08-04', '2025-08-15'];
  const externalDaysLabels: { date: string; label: string }[] = [
    { date: '2025-08-03', label: '기념일' },
  ];
  const variant: CalendarVariants | undefined = CALENDAR_VARIANTS.RANGE;
  const holidaysSet = useMemo(
    () =>
      new Set(holidays.map((holiday) => dayjs(holiday).format('YYYY-MM-DD'))),
    [holidays],
  );
  const isHoliday = useCallback(
    ({ date }: { date: Dayjs }) => holidaysSet.has(date.format('YYYY-MM-DD')),
    [holidaysSet],
  );
  const isStart = useCallback(
    ({ date }: { date: Dayjs }) => {
      return internalValue?.startDate?.isSame(date, 'day') ?? false;
    },
    [internalValue?.startDate],
  );
  const isEnd = useCallback(
    ({ date }: { date: Dayjs }) => {
      return internalValue?.endDate?.isSame(date, 'day') ?? false;
    },
    [internalValue?.endDate],
  );
  const isSelected = useCallback(
    ({ date }: { date: Dayjs }) => {
      if (variant === CALENDAR_VARIANTS.RANGE) {
        if (internalValue?.startDate && !internalValue?.endDate) {
          return date.isSame(internalValue?.startDate, 'day');
        }

        if (internalValue?.startDate && internalValue?.endDate) {
          return date.isBetween(
            internalValue?.startDate,
            internalValue?.endDate,
            'day',
            '[]',
          );
        }

        return false;
      }

      if (variant === CALENDAR_VARIANTS.UNBOUNDED) {
        return date.isSameOrAfter(internalValue?.startDate, 'day');
      }

      return date.isSame(internalValue?.startDate, 'day');
    },
    [internalValue?.startDate, internalValue?.endDate, variant],
  );

  const getLabel = useCallback(
    ({
      date,
      isToday,
      isHoliday,
    }: {
      date: Dayjs;
      isToday: boolean;
      isHoliday: boolean;
    }) => {
      const dateString = date.format('YYYY-MM-DD');
      const foundLabel = externalDaysLabels.find(
        (label) => label.date === dateString,
      );

      if (foundLabel) {
        return foundLabel.label;
      }

      if (isToday) return '오늘';

      if (isHoliday) return '공휴일';
    },
    [externalDaysLabels],
  );

  const isDisabled = useCallback(
    ({ date }: { date: Dayjs }) => {
      if (minDate && date.isBefore(dayjs(minDate), 'day')) return true;

      if (maxDate && date.isAfter(dayjs(maxDate), 'day')) return true;

      return disabledDays.includes(date.format('YYYY-MM-DD'));
    },
    [disabledDays, minDate, maxDate],
  );

  const handleSingleClick = useCallback(
    ({ date }: { date: Dayjs }) => {
      if (isStart({ date })) return;

      setInternalValue({ startDate: date, endDate: date });
    },
    [isStart],
  );

  const handleRangeClick = useCallback(
    ({ date }: { date: Dayjs }) => {
      if (internalValue && internalValue.startDate && !internalValue.endDate) {
        const isBeforeStartDate = date.isBefore(internalValue.startDate);

        return setInternalValue((prev) =>
          isBeforeStartDate
            ? { startDate: date, endDate: prev?.startDate! }
            : { startDate: prev?.startDate!, endDate: date },
        );
      }

      return setInternalValue({
        startDate: date,
        endDate: null,
      });
    },
    [isStart, isEnd],
  );

  const handleUnboundedClick = useCallback(
    ({ date }: { date: Dayjs }) => {
      if (isStart({ date })) return;

      setInternalValue({ startDate: date, endDate: null });
    },
    [isStart],
  );

  const handleClick = useCallback(
    ({ date }: { date: Dayjs }) => {
      if (isDisabled({ date })) return;

      // @ts-ignore
      if (variant === CALENDAR_VARIANTS.SINGLE) {
        handleSingleClick({ date });
      }

      if (variant === CALENDAR_VARIANTS.RANGE) {
        handleRangeClick({ date });
      }

      // @ts-ignore
      if (variant === CALENDAR_VARIANTS.UNBOUNDED) {
        handleUnboundedClick({ date });
      }
    },
    [
      variant,
      handleSingleClick,
      handleRangeClick,
      handleUnboundedClick,
      isDisabled,
    ],
  );

  const generateMonthDays = ({
    year,
    month,
  }: {
    year: number;
    month: number;
  }) => {
    const todayToString = today.format('YYYY-MM-DD');
    const firstDayOfMonth = dayjs(
      `${year}-${month.toString().padStart(2, '0')}-01`,
    );
    const lastDayOfMonth = firstDayOfMonth.endOf('month');
    const firstDay = firstDayOfMonth.date();
    const lastDay = lastDayOfMonth.date();
    const firstDayWeekday = firstDayOfMonth.day();

    const days = Array.from({ length: CALENDAR_DAYS_COUNT }, (_, index) => {
      const dayIndex = index - firstDayWeekday + firstDay;
      const isExcluded = dayIndex < firstDay || dayIndex > lastDay;

      if (isExcluded) {
        return null;
      }

      const dayToString = `${year}-${month.toString().padStart(2, '0')}-${dayIndex.toString().padStart(2, '0')}`;
      const date = dayjs(dayToString);
      const dateToString = date.format('YYYY-MM-DD');
      const isToday = dateToString === todayToString;

      return {
        day: dayIndex,
        date: date,
        label: getLabel({ date, isToday, isHoliday: isHoliday({ date }) }),
        variant: getDayVariant({
          week: date.day(),
          useWeekend: false,
          variant,
          isDisabled: isDisabled({ date }),
          isHoliday: isHoliday({ date }),
          isSelected: isSelected({ date }),
          isToday,
          isStart: isStart({ date }),
          isEnd: isEnd({ date }),
        }),
      };
    });

    return days;
  };

  const daysMap = useMemo(() => {
    const map = new Map();

    CALENDAR_MONTHLY_ARRAY.forEach((month) => {
      map.set(month, generateMonthDays({ year, month }));
    });

    return map;
  }, [generateMonthDays, year]);

  useEffect(() => {
    if (isMounted.current || !monthlyWrapperRef.current) return;

    isMounted.current = true;

    if (value) {
      const { startDate } = value;
      const month = dayjs(startDate).month().toString();
      const year = dayjs(startDate).year();

      setYear(year);

      if (monthlyRefs.current[month]) {
        monthlyRefs.current[month].scrollIntoView({
          behavior: 'instant',
          block: 'start',
        });
      }

      return;
    }

    const minDateDayjs = dayjs(minDate);
    const isAfterToday = today.isAfter(minDateDayjs, 'day');

    if (!isAfterToday) {
      const year = minDateDayjs.year();
      const month = minDateDayjs.month().toString();

      setYear(year);

      if (monthlyRefs.current[month]) {
        monthlyRefs.current[month].scrollIntoView({
          behavior: 'instant',
          block: 'start',
        });
      }

      return;
    }

    const defaultMonth = today.month().toString();

    if (monthlyRefs.current[defaultMonth]) {
      monthlyRefs.current[defaultMonth].scrollIntoView({
        behavior: 'instant',
        block: 'start',
      });
    }
  }, [
    daysMap,
    value,
    minDate,
    monthlyWrapperRef.current,
    monthlyRefs.current,
    isMounted.current,
  ]);

  const onYearChange = useCallback(
    ({ navigateType }: CalendarYearChangeParams) => {
      if (navigateType === CALENDAR_NAVIGATE_TYPE.NEXT) {
        setYear((prev) => prev + 1);
      }

      if (navigateType === CALENDAR_NAVIGATE_TYPE.PREV) {
        setYear((prev) => prev - 1);
      }

      monthlyWrapperRef.current?.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    },
    [monthlyWrapperRef.current],
  );

  return (
    <div className='in-flex-v-stack in-tablet:p-[0.875rem] in-tablet:min-h-[26svh] in-tablet:max-h-[34svh] overflow-hidden p-4'>
      <CalendarNavigator onYearChange={onYearChange}>
        <CalendarYear year={year} />
      </CalendarNavigator>
      <div role='grid' className='in-flex-v-stack overflow-hidden'>
        <CalendarWeeks>
          {WEEKS.map((week) => (
            <CalendarWeek key={week} week={week as CalendarWeekWeeks} />
          ))}
        </CalendarWeeks>
        <div
          ref={monthlyWrapperRef}
          role='presentation'
          className='in-flex-v-stack gap-y-2.5 overflow-y-scroll'
        >
          {CALENDAR_MONTHLY_ARRAY.map((month) => {
            const daysOfMonth = daysMap.get(month);

            return (
              <CalendarMonthly
                key={month}
                setRef={(el) => (monthlyRefs.current[month.toString()] = el)}
              >
                <CalendarMonth month={month} />
                {CALENDAR_DAYS_ARRAY.map((daysIndex) => {
                  const daysKey = `${month}-${daysIndex}`;

                  return (
                    <CalendarDays key={daysKey}>
                      {CALENDAR_WEEKS_ARRAY.map((weekIndex) => {
                        const dayKey = `${daysKey}-${weekIndex}`;
                        const dayIndex =
                          daysIndex * CALENDAR_WEEKS_COUNT + weekIndex;
                        const dayData = daysOfMonth[dayIndex];

                        if (dayData === null) {
                          return <CalendarEmptyCell key={dayKey} />;
                        }

                        const { date, ...rest } = dayData;

                        return (
                          <CalendarDay
                            key={dayKey}
                            onClick={() => handleClick({ date })}
                            {...rest}
                          />
                        );
                      })}
                    </CalendarDays>
                  );
                })}
              </CalendarMonthly>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
