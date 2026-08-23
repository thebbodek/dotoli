import { HTMLAttributes } from 'react';

import { CalendarMonthValue } from '@/components/Calendar/shared';

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
  onDateClick?: (props: CalendarDateClickProps) => void;
}

export interface CalendarMonthProps
  extends CalendarMonthValue,
    Pick<CalendarProps, 'selectedDates' | 'useRange' | 'onDateClick'> {
  holidaySet: ReadonlySet<string>;
  disabledSet: ReadonlySet<string>;
}

export interface GenerateCalendarMonthWeeksProps extends CalendarMonthValue {}

export interface ResolveCalendarSelectedTypeProps
  extends Pick<CalendarProps, 'selectedDates' | 'useRange'>,
    CalendarDateClickProps {}
