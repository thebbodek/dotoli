import { HTMLAttributes } from 'react';

import {
  CalendarMonthValue,
  CalendarWeekStartDay,
} from '@/components/Calendar/shared';

export interface CalendarDateClickProps {
  dateString: string;
}

export interface CalendarProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  months: readonly CalendarMonthValue[];
  selectedDates?: readonly string[];
  holidays?: readonly string[];
  disabledDates?: readonly string[];
  useRange?: boolean;
  weekStartDay?: CalendarWeekStartDay;
  onDateClick?: (props: CalendarDateClickProps) => void;
}

export interface CalendarMonthProps
  extends CalendarMonthValue,
    Pick<CalendarProps, 'selectedDates' | 'useRange' | 'onDateClick'>,
    Required<Pick<CalendarProps, 'weekStartDay'>> {
  holidaySet: ReadonlySet<string>;
  disabledSet: ReadonlySet<string>;
}

export interface GenerateCalendarMonthWeeksProps
  extends CalendarMonthValue,
    Required<Pick<CalendarProps, 'weekStartDay'>> {}

export interface ResolveCalendarSelectedTypeProps
  extends Pick<CalendarProps, 'selectedDates' | 'useRange'>,
    CalendarDateClickProps {}
