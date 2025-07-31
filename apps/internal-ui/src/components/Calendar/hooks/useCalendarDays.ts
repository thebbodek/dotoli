import { date } from '@bbodek/utils';
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
        holidays?.map((holiday) => date.toString({ date: holiday })) ?? [],
      ),
    [holidays],
  );

  const getLabel = useCallback(
    ({
      dateValue,
      isToday,
      isHoliday,
    }: Pick<CalendarDaysOfMonth, 'dateValue'> &
      Pick<GetDayVariantParams, 'isToday' | 'isHoliday'>) => {
      const dateString = date.toString({ date: dateValue });
      const foundLabel = externalDaysLabels?.find(
        (label) => label.dateValue === dateString,
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
      const todayToString = date.toString({ date: date.now() });
      const firstDayOfMonth = date.timezone({
        date: `${year}-${month.toString().padStart(2, '0')}-01`,
      });
      const lastDayOfMonth = date.endOf({
        date: firstDayOfMonth,
        unit: 'month',
      });
      const firstDay = date.date({ date: firstDayOfMonth });
      const lastDay = date.date({ date: lastDayOfMonth });
      const firstDayWeekday = date.day({ date: firstDayOfMonth });

      const daysOfMonth = Array.from(
        { length: CALENDAR_DAYS_COUNT },
        (_, index) => {
          const dayIndex = index - firstDayWeekday + firstDay;
          const isExcluded = dayIndex < firstDay || dayIndex > lastDay;

          if (isExcluded) {
            return null;
          }

          const dayToString = `${year}-${month.toString().padStart(2, '0')}-${dayIndex.toString().padStart(2, '0')}`;
          const _dateValue = date.toParseDateType({
            date: dayToString,
            type: 'dayjs',
          });
          const dateToString = date.toString({ date: _dateValue });
          const isToday = dateToString === todayToString;

          return {
            key: dateToString,
            day: dayIndex,
            dateValue: _dateValue,
            label: getLabel({
              dateValue: _dateValue,
              isToday,
              isHoliday: isHoliday({ dateValue: _dateValue, holidaysSet }),
            }),
            variant: getDayVariant({
              week: date.day({ date: _dateValue }),
              useWeekend,
              variant: _variant,
              isDisabled: isDisabled({
                dateValue: _dateValue,
                minDate,
                maxDate,
                disabledDays,
              }),
              isHoliday: isHoliday({ dateValue: _dateValue, holidaysSet }),
              isSelected: isSelected({ dateValue: _dateValue }),
              isToday,
              isStart: isStart({ dateValue: _dateValue }),
              isEnd: isEnd({ dateValue: _dateValue }),
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
