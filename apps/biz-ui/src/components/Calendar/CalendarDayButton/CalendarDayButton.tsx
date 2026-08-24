import clsx from 'clsx';

import {
  CALENDAR_DAY_BUTTON_BASE_STYLE,
  CALENDAR_DAY_BUTTON_CURSOR_STYLES,
  CALENDAR_DAY_BUTTON_DAY_OFFSET_STYLE,
  CALENDAR_DAY_BUTTON_SELECTED_TYPE_STYLES,
  CALENDAR_DAY_BUTTON_STATE_COLORS,
  CALENDAR_DAY_BUTTON_STATES,
  CALENDAR_DAY_SELECTED_TYPES,
} from '@/components/Calendar/CalendarDayButton/constants';
import { CalendarDayButtonProps } from '@/components/Calendar/CalendarDayButton/types';
import { resolveCalendarDayButtonState } from '@/components/Calendar/CalendarDayButton/utils';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const CalendarDayButton = ({
  day,
  date,
  selectedType = CALENDAR_DAY_SELECTED_TYPES.NONE,
  isHoliday = false,
  disabled = false,
  className,
  'aria-label': ariaLabel,
  onClick,
}: CalendarDayButtonProps) => {
  const hasDay = !!day;
  const hasDate = date !== undefined;
  const state = resolveCalendarDayButtonState({
    disabled,
    isHoliday,
    selectedType,
    hasDay,
  });
  const color = CALENDAR_DAY_BUTTON_STATE_COLORS[state];
  const valueVariant =
    state === CALENDAR_DAY_BUTTON_STATES.SELECTED
      ? TYPOGRAPHY_VARIANTS.BODY_BOLD
      : TYPOGRAPHY_VARIANTS.BODY;

  return (
    <button
      className={clsx(
        className,
        CALENDAR_DAY_BUTTON_BASE_STYLE,
        CALENDAR_DAY_BUTTON_SELECTED_TYPE_STYLES[selectedType],
        disabled
          ? CALENDAR_DAY_BUTTON_CURSOR_STYLES.DISABLED
          : CALENDAR_DAY_BUTTON_CURSOR_STYLES.ENABLED,
      )}
      aria-label={ariaLabel}
      aria-pressed={selectedType !== CALENDAR_DAY_SELECTED_TYPES.NONE}
      disabled={disabled}
      type='button'
      onClick={onClick}
    >
      {hasDay && (
        <Typography
          className={clsx(hasDate && CALENDAR_DAY_BUTTON_DAY_OFFSET_STYLE)}
          color={color}
          variant={hasDate ? TYPOGRAPHY_VARIANTS.LABEL : valueVariant}
        >
          {day}
        </Typography>
      )}
      {hasDate && (
        <Typography color={color} variant={valueVariant}>
          {date}
        </Typography>
      )}
    </button>
  );
};

export default CalendarDayButton;
