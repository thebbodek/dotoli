import { date, day, endOf, now, timezone, toString } from '@bbodek/utils';
import { useCallback, useMemo } from 'react';

import {
  CALENDAR_DAYS_COUNT,
  CALENDAR_DEFAULT_LABELS,
  CALENDAR_MONTHLY_ARRAY,
} from '@/components/Calendar/constants';
import useCalendarHolidays from '@/components/Calendar/hooks/useCalendarHolidays';
import {
  GenerateMonthDaysParams,
  GetLabelParams,
  UseCalendarDaysProps,
  UseCalendarDaysReturn,
} from '@/components/Calendar/types';
import {
  getIsDisabledDate,
  getStringDate,
  getWeekIndex,
} from '@/components/Calendar/utils';

const useCalendarDays = ({
  year,
  holidays,
  externalDaysLabels,
  minDate,
  maxDate,
  disabledDays,
}: UseCalendarDaysProps): UseCalendarDaysReturn => {
  const { holidaysSet } = useCalendarHolidays({ holidays });

  const minDateString = useMemo(
    () => (minDate ? toString({ date: minDate }) : null),
    [minDate],
  );

  const maxDateString = useMemo(
    () => (maxDate ? toString({ date: maxDate }) : null),
    [maxDate],
  );

  const disabledDaysSet = useMemo(
    () =>
      new Set(
        (disabledDays ?? []).map((disabledDay) =>
          toString({ date: disabledDay }),
        ),
      ),
    [disabledDays],
  );

  const externalDaysLabelsMap = useMemo(
    () =>
      new Map(
        (externalDaysLabels ?? []).map(({ dateValue, label }) => [
          toString({ date: dateValue }),
          label,
        ]),
      ),
    [externalDaysLabels],
  );

  const getLabel = useCallback(
    ({ dateString, isToday, isHoliday }: GetLabelParams) => {
      const externalLabel = externalDaysLabelsMap.get(dateString);

      if (externalLabel) return externalLabel;

      if (isToday) return CALENDAR_DEFAULT_LABELS.TODAY;

      if (isHoliday) return CALENDAR_DEFAULT_LABELS.HOLIDAY;

      return null;
    },
    [externalDaysLabelsMap],
  );

  const generateMonthDays = useCallback(
    ({ year, month }: GenerateMonthDaysParams) => {
      const todayString = toString({ date: now() });
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

      return Array.from({ length: CALENDAR_DAYS_COUNT }, (_, index) => {
        const dayIndex = index - firstDayWeekday + firstDay;
        const isExcluded = dayIndex < firstDay || dayIndex > lastDay;

        if (isExcluded) {
          return null;
        }

        const dateString = getStringDate({ year, month, day: dayIndex });
        const isHoliday = holidaysSet.has(dateString);
        const isToday = dateString === todayString;

        return {
          key: dateString,
          day: dayIndex,
          dateString,
          week: getWeekIndex({ index }),
          isHoliday,
          isToday,
          isDisabled: getIsDisabledDate({
            dateString,
            minDateString,
            maxDateString,
            disabledDaysSet,
          }),
          label: getLabel({ dateString, isToday, isHoliday }),
        };
      });
    },
    [getLabel, holidaysSet, disabledDaysSet, minDateString, maxDateString],
  );

  const days = useMemo(
    () =>
      new Map(
        CALENDAR_MONTHLY_ARRAY.map((month) => [
          month,
          generateMonthDays({ year, month: month + 1 }),
        ]),
      ),
    [generateMonthDays, year],
  );

  return { days };
};

export default useCalendarDays;
