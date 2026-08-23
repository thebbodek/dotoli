import { ResolveCalendarSelectedTypeProps } from '@/components/Calendar/Calendar/types';
import { CALENDAR_DAY_SELECTED_TYPES } from '@/components/Calendar/CalendarDayButton';

export const resolveCalendarSelectedType = ({
  dateString,
  selectedDates = [],
  useRange = false,
}: ResolveCalendarSelectedTypeProps) => {
  const isSelected = selectedDates.includes(dateString);

  if (!useRange) {
    return isSelected
      ? CALENDAR_DAY_SELECTED_TYPES.SELECTED
      : CALENDAR_DAY_SELECTED_TYPES.NONE;
  }

  const [start, ...rest] = [...selectedDates].sort();
  const end = rest.at(-1);

  if (!start) return CALENDAR_DAY_SELECTED_TYPES.NONE;

  if (!end) {
    return dateString === start
      ? CALENDAR_DAY_SELECTED_TYPES.SELECTED
      : CALENDAR_DAY_SELECTED_TYPES.NONE;
  }

  if (dateString === start) return CALENDAR_DAY_SELECTED_TYPES.START;

  if (dateString === end) return CALENDAR_DAY_SELECTED_TYPES.END;

  return dateString > start && dateString < end
    ? CALENDAR_DAY_SELECTED_TYPES.MIDDLE
    : CALENDAR_DAY_SELECTED_TYPES.NONE;
};
