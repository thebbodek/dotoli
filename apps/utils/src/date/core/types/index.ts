import { Dayjs } from 'dayjs';

import { DateUnit } from '@/date/calculations/types';
import { DateFormatType } from '@/date/formatting/types';

/**
 * @description Unit type of dayjs ConfigType
 * @see https://github.com/iamkun/dayjs/blob/dev/types/index.d.ts
 */
export type DateValue = Dayjs;
export type DateType = string | number | DateValue;

export interface DateTimeZoneParams {
  date?: DateType;
  format?: DateFormatType;
  isStrict?: boolean;
}

export interface DateGetParams extends Pick<DateTimeZoneParams, 'date'> {
  unit?: DateUnit;
}

export interface DateYearParams extends Pick<DateTimeZoneParams, 'date'> {}

export interface DateMonthParams extends Pick<DateTimeZoneParams, 'date'> {}

export interface DateDayParams extends Pick<DateTimeZoneParams, 'date'> {}

export interface DateDateParams extends Pick<DateTimeZoneParams, 'date'> {}

export interface DateSetParams extends Pick<DateTimeZoneParams, 'date'> {
  value: number;
  unit?: DateUnit;
}

export interface DateStartOfParams extends Pick<DateTimeZoneParams, 'date'> {
  unit?: DateUnit;
}

export interface DateEndOfParams extends Pick<DateTimeZoneParams, 'date'> {
  unit?: DateUnit;
}
