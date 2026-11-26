import { HTMLAttributes } from 'react';

import { CalendarWeekStartDay } from '@/components/Calendar/shared';
import { ColorVariants } from '@/variants';

export interface StickyCalendarWeekday {
  label: string;
  color: ColorVariants;
}

export interface StickyCalendarDateSelectOption {
  year: number;
  isPrevYearDisabled?: boolean;
  isNextYearDisabled?: boolean;
  onPrevYear: () => void;
  onNextYear: () => void;
  onYearClick: () => void;
}

export interface StickyCalendarProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  dateSelectOption?: StickyCalendarDateSelectOption;
  useWeekday?: boolean;
  weekStartDay?: CalendarWeekStartDay;
}

export interface RotateStickyCalendarWeekdaysProps
  extends Required<Pick<StickyCalendarProps, 'weekStartDay'>> {}
