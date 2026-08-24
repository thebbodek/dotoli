import { ButtonHTMLAttributes } from 'react';

import {
  CALENDAR_DAY_BUTTON_STATES,
  CALENDAR_DAY_SELECTED_TYPES,
} from '@/components/Calendar/CalendarDayButton/constants';

export type CalendarDaySelectedType =
  (typeof CALENDAR_DAY_SELECTED_TYPES)[keyof typeof CALENDAR_DAY_SELECTED_TYPES];

export type CalendarDayButtonState =
  (typeof CALENDAR_DAY_BUTTON_STATES)[keyof typeof CALENDAR_DAY_BUTTON_STATES];

export interface CalendarDayButtonProps
  extends Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'disabled' | 'onClick' | 'aria-label'
  > {
  day?: string;
  date?: number;
  selectedType?: CalendarDaySelectedType;
  isHoliday?: boolean;
}

export interface ResolveCalendarDayButtonStateProps
  extends Pick<
    CalendarDayButtonProps,
    'disabled' | 'isHoliday' | 'selectedType'
  > {
  hasDay: boolean;
}
