import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';

import {
  CALENDAR_DAYS_COUNT,
  CALENDAR_DEFAULT_LABELS,
  CALENDAR_MONTHLY_ARRAY,
} from '@/components/Calendar/constants';
import { useCalendarContext } from '@/components/Calendar/context';
import useCalendarValidUtils from '@/components/Calendar/hooks/useCalendarValidUtils';
import {
  CalendarContextValue,
  CalendarDaysOfMonth,
  CalendarMonthProps,
  GetDayVariantParams,
  UseCalendarDaysProps,
  UseCalendarDaysReturn,
} from '@/components/Calendar/types';
import { getDayVariant } from '@/components/Calendar/utils';

const useCalendarDays = ({
  year,
  holidays,
  externalDaysLabels,
  useWeekend = false,
  minDate,
  maxDate,
  disabledDays,
}: UseCalendarDaysProps): UseCalendarDaysReturn => {
  const { variant } = useCalendarContext();
  const { isHoliday, isStart, isEnd, isDisabled, isSelected } =
    useCalendarValidUtils();

  const holidaysSet = useMemo(
    () =>
      new Set(
        holidays?.map((holiday) => dayjs(holiday).format('YYYY-MM-DD')) ?? [],
      ),
    [holidays],
  );

  const getLabel = useCallback(
    ({
      date,
      isToday,
      isHoliday,
    }: Pick<CalendarDaysOfMonth, 'date'> &
      Pick<GetDayVariantParams, 'isToday' | 'isHoliday'>) => {
      const dateString = date.format('YYYY-MM-DD');
      const foundLabel = externalDaysLabels?.find(
        (label) => label.date === dateString,
      );

      if (foundLabel) return foundLabel.label;

      if (isToday) return CALENDAR_DEFAULT_LABELS.TODAY;

      if (isHoliday) return CALENDAR_DEFAULT_LABELS.HOLIDAY;

      return null;
    },
    [externalDaysLabels],
  );

  const generateMonthDays = useCallback(
    ({
      year,
      month,
      variant: _variant,
    }: Pick<UseCalendarDaysProps, 'year'> &
      Pick<CalendarContextValue, 'variant'> &
      Pick<CalendarMonthProps, 'month'>) => {
      const today = dayjs();
      const todayToString = today.format('YYYY-MM-DD');
      const firstDayOfMonth = dayjs(
        `${year}-${month.toString().padStart(2, '0')}-01`,
      );
      const lastDayOfMonth = firstDayOfMonth.endOf('month');
      const firstDay = firstDayOfMonth.date();
      const lastDay = lastDayOfMonth.date();
      const firstDayWeekday = firstDayOfMonth.day();

      const daysOfMonth = Array.from(
        { length: CALENDAR_DAYS_COUNT },
        (_, index) => {
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
            key: dateToString,
            day: dayIndex,
            date,
            label: getLabel({
              date,
              isToday,
              isHoliday: isHoliday({ date, holidaysSet }),
            }),
            variant: getDayVariant({
              week: date.day(),
              useWeekend,
              variant: _variant,
              isDisabled: isDisabled({
                date,
                minDate,
                maxDate,
                disabledDays,
              }),
              isHoliday: isHoliday({ date, holidaysSet }),
              isSelected: isSelected({ date }),
              isToday,
              isStart: isStart({ date }),
              isEnd: isEnd({ date }),
            }),
          };
        },
      );

      return daysOfMonth;
    },
    [
      getLabel,
      isDisabled,
      isHoliday,
      isSelected,
      isStart,
      isEnd,
      holidaysSet,
      useWeekend,
      minDate,
      maxDate,
      disabledDays,
    ],
  );

  const days = useMemo(
    () =>
      new Map(
        CALENDAR_MONTHLY_ARRAY.map((month) => [
          month,
          generateMonthDays({ year, month: month + 1, variant }),
        ]),
      ),
    [generateMonthDays, year, variant],
  );

  return { days };
};

export default useCalendarDays;
