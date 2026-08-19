import { DateValue } from '@bbodek/utils';
import { Dispatch, HTMLAttributes, RefObject, SetStateAction } from 'react';

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

export interface CalendarNavigatorProps extends CalendarYearProps {
  onYearChange: (params: CalendarYearChangeParams) => void;
}

export type CalendarYear = number;
export type CalendarMonth = number;
export type CalendarDay = number;
export interface CalendarDaysOfMonth {
  key: string;
  day: CalendarDay;
  dateString: CalendarDateValue;
  week: CalendarWeeksValues;
  label: CalendarDayLabel | null;
  isDisabled: boolean;
  isHoliday: boolean;
  isToday: boolean;
}

export interface CalendarDateStringParams
  extends Pick<CalendarDaysOfMonth, 'dateString'> {}

export interface CalendarYearProps {
  year: CalendarYear;
}

export interface CalendarWeekProps {
  week: CalendarWeekWeeks;
}

export interface CalendarMonthProps {
  month: CalendarMonth;
}

export interface CalendarMonthlyProps {
  setRef: (el: HTMLDivElement) => void;
}

export interface CalendarMonthlyRowProps
  extends Required<Pick<CalendarProps, 'useWeekend'>> {
  month: CalendarMonth;
  daysIndex: number;
  daysOfMonth: (CalendarDaysOfMonth | null)[];
  handleClick: (params: CalendarDateStringParams) => void;
}

export interface CalendarDayProps
  extends Pick<CalendarDaysOfMonth, 'day' | 'label' | 'dateString'> {
  variant: CalendarDayVariants;
  onClick: (params: CalendarDateStringParams) => void;
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

export type CalendarDateValue = string;

export type CalendarValue = {
  startDate: CalendarDateValue | null;
  endDate: CalendarDateValue | null;
} | null;

export interface CalendarContextProviderProps
  extends Omit<
    CalendarContextValue,
    | 'internalValue'
    | 'internalValueStrings'
    | 'setInternalValue'
    | 'handleChange'
    | 'setCalendarInternalValue'
  > {}

export interface CalendarInternalValue {
  startDate: DateValue | null;
  endDate: DateValue | null;
}

export interface CalendarInternalValueStrings {
  startDateString: CalendarDateValue | null;
  endDateString: CalendarDateValue | null;
}

export interface CalendarContextValue {
  value: CalendarValue;
  internalValue: CalendarInternalValue | null;
  internalValueStrings: CalendarInternalValueStrings;
  variant: CalendarVariants;
  onChange: (value: CalendarValue) => void;
  handleChange: () => void;
  setInternalValue: Dispatch<SetStateAction<CalendarInternalValue | null>>;
  setCalendarInternalValue: () => void;
}

export type CalendarDayLabel = string;
export type CalendarExternalDaysLabel = {
  dateValue: CalendarDateValue;
  label: CalendarDayLabel;
};

export interface CalendarProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'id' | 'className'> {
  labelId?: string;
  minDate?: CalendarDateValue;
  maxDate?: CalendarDateValue;
  holidays?: CalendarDateValue[];
  disabledDays?: CalendarDateValue[];
  externalDaysLabels?: CalendarExternalDaysLabel[];
  useWeekend?: boolean;
}

export interface UseCalendarProps
  extends Omit<CalendarProps, 'labelId' | 'id' | 'className' | 'useWeekend'> {}

export interface UseCalendarDaysProps
  extends Omit<CalendarProps, 'labelId' | 'id' | 'className' | 'useWeekend'> {
  year: CalendarYear;
}

export interface UseCalendarDaysReturn {
  days: Map<CalendarMonth, (CalendarDaysOfMonth | null)[]>;
}

export interface UseCalendarHandlersProps {
  monthlyWrapperRef: RefObject<HTMLDivElement | null>;
  setYear: Dispatch<SetStateAction<CalendarYear>>;
}

export interface UseCalendarHandlersReturn {
  onYearChange: (params: CalendarYearChangeParams) => void;
  handleClick: (params: CalendarDateStringParams) => void;
}

export type CalendarMonthlyRefs = Record<CalendarMonth, HTMLDivElement | null>;

export interface UseCalendarReturn {
  models: {
    year: CalendarYear;
    monthlyWrapperRef: RefObject<HTMLDivElement | null>;
    monthlyRefs: RefObject<CalendarMonthlyRefs>;
  } & UseCalendarDaysReturn;
  operations: {
    setYear: Dispatch<SetStateAction<CalendarYear>>;
  } & UseCalendarHandlersReturn;
}

export interface UseCalendarInitialScrollEffectProps
  extends Pick<CalendarProps, 'minDate'>,
    Pick<UseCalendarReturn['models'], 'monthlyRefs'>,
    Pick<UseCalendarReturn['operations'], 'setYear'> {}

export interface UseCalendarSyncExternalValueEffectProps
  extends Pick<CalendarContextProviderProps, 'value'>,
    Pick<CalendarContextValue, 'setInternalValue'> {}

export interface UseCalendarHolidaysProps
  extends Pick<CalendarProps, 'holidays'> {}

export interface GetLabelParams
  extends Pick<CalendarDaysOfMonth, 'dateString' | 'isToday' | 'isHoliday'> {}

export interface GetIsDisabledDateParams extends CalendarDateStringParams {
  minDateString: CalendarDateValue | null;
  maxDateString: CalendarDateValue | null;
  disabledDaysSet: Set<CalendarDateValue>;
}

export interface GetIsSameStartDateParams extends CalendarDateStringParams {
  internalValue: CalendarInternalValue | null;
}

export interface GetWeekIndexParams {
  index: number;
}

export interface GetIsEmptyMonthlyRowParams
  extends Pick<CalendarMonthlyRowProps, 'daysOfMonth' | 'daysIndex'> {}

export interface GetStringDateParams
  extends Pick<GenerateMonthDaysParams, 'year' | 'month'> {
  day: CalendarDay;
}

export interface GenerateMonthDaysParams
  extends Pick<UseCalendarDaysProps, 'year'>,
    Pick<CalendarMonthProps, 'month'> {}

export interface ScrollToMonthParams {
  month: CalendarMonth;
}

export interface HandleScrollParams extends ScrollToMonthParams {
  year: CalendarYear;
}
