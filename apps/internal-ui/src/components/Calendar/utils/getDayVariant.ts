import {
  CALENDAR_DAY_VARIANTS,
  CALENDAR_VARIANTS,
  CALENDAR_WEEKS,
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
  const isSunday =
    week === CALENDAR_WEEKS_META_DATA[CALENDAR_WEEKS.SUNDAY].VALUE;
  const isSaturday =
    week === CALENDAR_WEEKS_META_DATA[CALENDAR_WEEKS.SATURDAY].VALUE;

  if (isSelected) {
    if (variant === CALENDAR_VARIANTS.SINGLE) {
      return CALENDAR_DAY_VARIANTS.SELECTED_SINGLE;
    }

    if (variant === CALENDAR_VARIANTS.RANGE && isStart && isEnd) {
      return CALENDAR_DAY_VARIANTS.SELECTED_RANGE_SINGLE;
    }

    if (isStart) {
      return CALENDAR_DAY_VARIANTS.STARTED;
    }

    if (isEnd) {
      return CALENDAR_DAY_VARIANTS.ENDED;
    }

    if (isDisabled || (!useWeekend && (isSunday || isSaturday))) {
      return CALENDAR_DAY_VARIANTS.SELECTED_DISABLED;
    }

    return CALENDAR_DAY_VARIANTS.SELECTED_RANGE;
  }

  if (isHoliday) {
    return !isDisabled
      ? CALENDAR_DAY_VARIANTS.HOLIDAY_ENABLE
      : CALENDAR_DAY_VARIANTS.HOLIDAY_DISABLED;
  }

  if (isSunday) {
    return !useWeekend
      ? CALENDAR_DAY_VARIANTS.SUNDAY_DISABLED
      : CALENDAR_DAY_VARIANTS.SUNDAY_ENABLE;
  }

  if (isSaturday) {
    return !useWeekend
      ? CALENDAR_DAY_VARIANTS.SATURDAY_DISABLED
      : CALENDAR_DAY_VARIANTS.SATURDAY_ENABLE;
  }

  if (isToday) {
    return !isDisabled
      ? CALENDAR_DAY_VARIANTS.TODAY
      : CALENDAR_DAY_VARIANTS.DEFAULT_DISABLED;
  }

  return !isDisabled
    ? CALENDAR_DAY_VARIANTS.DEFAULT_ENABLE
    : CALENDAR_DAY_VARIANTS.DEFAULT_DISABLED;
};
