import {
  date,
  day,
  endOf,
  now,
  timezone,
  toPaddedString,
  toParseDateType,
  toString,
} from '@bbodek/utils';
import { useCallback, useMemo } from 'react';

import {
  CALENDAR_DAYS_COUNT,
  CALENDAR_DEFAULT_LABELS,
  CALENDAR_MONTHLY_ARRAY,
} from '@/components/Calendar/constants';
import { useCalendarContext } from '@/components/Calendar/context';
import useCalendarHolidays from '@/components/Calendar/hooks/useCalendarHolidays';
import useCalendarValidUtils from '@/components/Calendar/hooks/useCalendarValidUtils';
import {
  GenerateMonthDaysParams,
  GetLabelParams,
  GetStringDateParams,
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
  const { holidaysSet } = useCalendarHolidays({ holidays });

  const getLabel = useCallback(
    ({ dateValue, isToday, isHoliday }: GetLabelParams) => {
      const dateString = toString({ date: dateValue });
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

  const getStringDate = ({ year, month, day }: GetStringDateParams) =>
    `${year}-${toPaddedString({ number: month, length: 2 })}-${toPaddedString({ number: day, length: 2 })}`;

  const generateMonthDays = useCallback(
    ({ year, month, variant: _variant }: GenerateMonthDaysParams) => {
      const todayToString = toString({ date: now() });
      const firstDayOfMonth = timezone({
        date: getStringDate({ year, month, day: 1 }),
      });
      const lastDayOfMonth = endOf({
        date: firstDayOfMonth,
        unit: 'month',
      });
      const firstDay = date({ date: firstDayOfMonth });
      const lastDay = date({ date: lastDayOfMonth });
      const firstDayWeekday = day({ date: firstDayOfMonth });

      const daysOfMonth = Array.from(
        { length: CALENDAR_DAYS_COUNT },
        (_, index) => {
          const dayIndex = index - firstDayWeekday + firstDay;
          const isExcluded = dayIndex < firstDay || dayIndex > lastDay;

          if (isExcluded) {
            return null;
          }

          const _dateValue = toParseDateType({
            date: getStringDate({ year, month, day: dayIndex }),
            type: 'dayjs',
          });
          const dateToString = toString({ date: _dateValue });
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
              week: day({ date: _dateValue }),
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
