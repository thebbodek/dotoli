import { ConfigType } from 'dayjs';

import { DateUnit } from '@/date/calculations/types';
import { DateFormatType } from '@/date/formatting/types';

export type DateType = Exclude<ConfigType, null | undefined>;

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
