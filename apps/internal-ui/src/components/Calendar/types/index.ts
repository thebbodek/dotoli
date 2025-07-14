import {
  CALENDAR_DAY_VARIANTS,
  CALENDAR_NAVIGATE_TYPE,
  CALENDAR_VARIANTS,
  CALENDAR_WEEKS,
} from '@/components/Calendar/constants';

export type CalendarVariants =
  (typeof CALENDAR_VARIANTS)[keyof typeof CALENDAR_VARIANTS];

export type CalendarNavigateType =
  (typeof CALENDAR_NAVIGATE_TYPE)[keyof typeof CALENDAR_NAVIGATE_TYPE];

export type CalendarDayVariants =
  (typeof CALENDAR_DAY_VARIANTS)[keyof typeof CALENDAR_DAY_VARIANTS];

export type CalendarWeekWeeks =
  (typeof CALENDAR_WEEKS)[keyof typeof CALENDAR_WEEKS];

export type CalendarWeeksValues = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface CalendarYearChangeParams {
  navigateType: CalendarNavigateType;
}

export interface CalendarNavigatorProps {
  onYearChange: (params: CalendarYearChangeParams) => void;
}

export interface CalendarYearProps {
  year: number;
}

export interface CalendarWeekProps {
  week: CalendarWeekWeeks;
}

export interface CalendarMonthProps {
  month: number;
}

export interface CalendarMonthlyProps {
  setRef: (el: HTMLDivElement | null) => void;
}

export interface CalendarDayProps {
  day: number;
  label?: string;
  variant: CalendarDayVariants;
  onClick: () => void;
}

export interface GetDayVariantParams {
  week: CalendarWeeksValues;
  useWeekend: boolean;
  variant: CalendarVariants;
  isDisabled: boolean;
  isHoliday: boolean;
  isSelected: boolean;
  isStart: boolean;
  isEnd: boolean;
  isToday: boolean;
}
