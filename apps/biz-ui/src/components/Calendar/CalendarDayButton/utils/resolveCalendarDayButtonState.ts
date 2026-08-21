import {
  CALENDAR_DAY_BUTTON_FILLED_SELECTED_TYPES,
  CALENDAR_DAY_BUTTON_STATES,
  CALENDAR_DAY_SELECTED_TYPES,
} from '@/components/Calendar/CalendarDayButton/constants';
import {
  CalendarDayButtonState,
  ResolveCalendarDayButtonStateProps,
} from '@/components/Calendar/CalendarDayButton/types';

export const resolveCalendarDayButtonState = ({
  disabled = false,
  isHoliday = false,
  selectedType = CALENDAR_DAY_SELECTED_TYPES.NONE,
  hasDay,
}: ResolveCalendarDayButtonStateProps): CalendarDayButtonState => {
  if (CALENDAR_DAY_BUTTON_FILLED_SELECTED_TYPES.includes(selectedType)) {
    return CALENDAR_DAY_BUTTON_STATES.SELECTED;
  }

  if (disabled) {
    return isHoliday && !hasDay
      ? CALENDAR_DAY_BUTTON_STATES.DISABLED_HOLIDAY
      : CALENDAR_DAY_BUTTON_STATES.DISABLED;
  }

  return isHoliday
    ? CALENDAR_DAY_BUTTON_STATES.HOLIDAY
    : CALENDAR_DAY_BUTTON_STATES.DEFAULT;
};
