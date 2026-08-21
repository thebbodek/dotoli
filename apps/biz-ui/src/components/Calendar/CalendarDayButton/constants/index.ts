import {
  CalendarDayButtonState,
  CalendarDaySelectedType,
} from '@/components/Calendar/CalendarDayButton/types';
import { COLOR_VARIANTS, ColorVariants } from '@/variants';

export const CALENDAR_DAY_SELECTED_TYPES = {
  NONE: 'none',
  SELECTED: 'selected',
  START: 'start',
  MIDDLE: 'middle',
  END: 'end',
} as const;

export const CALENDAR_DAY_BUTTON_STATES = {
  DEFAULT: 'default',
  HOLIDAY: 'holiday',
  DISABLED: 'disabled',
  DISABLED_HOLIDAY: 'disabledHoliday',
  SELECTED: 'selected',
} as const;

export const CALENDAR_DAY_BUTTON_FILLED_SELECTED_TYPES: readonly CalendarDaySelectedType[] =
  [
    CALENDAR_DAY_SELECTED_TYPES.SELECTED,
    CALENDAR_DAY_SELECTED_TYPES.START,
    CALENDAR_DAY_SELECTED_TYPES.END,
  ];

export const CALENDAR_DAY_BUTTON_BASE_STYLE =
  'flex-v-stack-center size-[48px] shrink-0 transition-colors';

export const CALENDAR_DAY_BUTTON_CURSOR_STYLES = {
  ENABLED: 'cursor-pointer',
  DISABLED: 'cursor-not-allowed',
} as const;

export const CALENDAR_DAY_BUTTON_SELECTED_TYPE_STYLES: Record<
  CalendarDaySelectedType,
  string
> = {
  [CALENDAR_DAY_SELECTED_TYPES.NONE]: 'rounded-6',
  [CALENDAR_DAY_SELECTED_TYPES.SELECTED]: 'rounded-6 bg-blue-500',
  [CALENDAR_DAY_SELECTED_TYPES.START]: 'rounded-l-6 bg-blue-500',
  [CALENDAR_DAY_SELECTED_TYPES.MIDDLE]: 'bg-blue-100',
  [CALENDAR_DAY_SELECTED_TYPES.END]: 'rounded-r-6 bg-blue-500',
};

export const CALENDAR_DAY_BUTTON_STATE_COLORS: Record<
  CalendarDayButtonState,
  ColorVariants
> = {
  [CALENDAR_DAY_BUTTON_STATES.DEFAULT]: COLOR_VARIANTS.BLACK,
  [CALENDAR_DAY_BUTTON_STATES.HOLIDAY]: COLOR_VARIANTS.RED_600,
  [CALENDAR_DAY_BUTTON_STATES.DISABLED]: COLOR_VARIANTS.GRAY_400,
  [CALENDAR_DAY_BUTTON_STATES.DISABLED_HOLIDAY]: COLOR_VARIANTS.RED_200,
  [CALENDAR_DAY_BUTTON_STATES.SELECTED]: COLOR_VARIANTS.WHITE,
};

export const CALENDAR_DAY_BUTTON_DAY_OFFSET_STYLE = 'mb-[-2px]';
