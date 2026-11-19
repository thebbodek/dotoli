import { HTMLAttributes } from 'react';

import { CalendarDayButtonProps } from '@/components/Calendar/CalendarDayButton/types';
import { CALENDAR_DAY_STATUSES } from '@/components/Calendar/CalendarDayStatus/constants';

export type CalendarDayStatusType =
  (typeof CALENDAR_DAY_STATUSES)[keyof typeof CALENDAR_DAY_STATUSES];

export interface CalendarDayStatusProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'>,
    Required<Pick<CalendarDayButtonProps, 'day'>>,
    Pick<CalendarDayButtonProps, 'date'> {
  status: CalendarDayStatusType;
  statusLabel: string;
}

export interface GenerateCalendarDayStatusSrLabelProps
  extends Pick<CalendarDayStatusProps, 'day' | 'date' | 'statusLabel'> {}
