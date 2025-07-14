import {
  CALENDAR_DAY_VARIANTS,
  CALENDAR_VARIANTS,
  CALENDAR_WEEKS_META_DATA,
} from '@/components/Calendar/constants';
import {
  CalendarDayVariants,
  GetDayVariantParams,
} from '@/components/Calendar/types';

export const getDayVariant = ({
  week,
  useWeekend,
  variant,
  isDisabled,
  isHoliday,
  isSelected,
  isToday,
  isStart,
  isEnd,
}: GetDayVariantParams): CalendarDayVariants => {
  const isSunday = week === CALENDAR_WEEKS_META_DATA.SUNDAY.VALUE;
  const isSaturday = week === CALENDAR_WEEKS_META_DATA.SATURDAY.VALUE;

  if (isStart) {
    return CALENDAR_DAY_VARIANTS.STARTED;
  }

  if (isEnd) {
    return CALENDAR_DAY_VARIANTS.ENDED;
  }

  if (isSelected) {
    if (isDisabled || (!useWeekend && (isSunday || isSaturday))) {
      return CALENDAR_DAY_VARIANTS.SELECTED_DISABLED;
    }

    return variant !== CALENDAR_VARIANTS.SINGLE
      ? CALENDAR_DAY_VARIANTS.SELECTED_RANGE
      : CALENDAR_DAY_VARIANTS.SELECTED_SINGLE;
  }

  if (isHoliday) {
    return !isDisabled
      ? CALENDAR_DAY_VARIANTS.HOLIDAY_ENABLE
      : CALENDAR_DAY_VARIANTS.HOLIDAY_DISABLE;
  }

  if (isSunday) {
    return !useWeekend
      ? CALENDAR_DAY_VARIANTS.SUNDAY_DISABLE
      : CALENDAR_DAY_VARIANTS.SUNDAY_ENABLE;
  }

  if (isSaturday) {
    return !useWeekend
      ? CALENDAR_DAY_VARIANTS.SATURDAY_DISABLE
      : CALENDAR_DAY_VARIANTS.SATURDAY_ENABLE;
  }

  if (isToday) {
    return CALENDAR_DAY_VARIANTS.TODAY;
  }

  return !isDisabled
    ? CALENDAR_DAY_VARIANTS.DEFAULT_ENABLE
    : CALENDAR_DAY_VARIANTS.DEFAULT_DISABLE;
};
