import { DateTimeZoneParams, DateType } from '@/date/core/types';

export interface DateIsValidParams
  extends Omit<DateTimeZoneParams, 'isStrict' | 'date'> {
  date: Extract<DateType, string>;
}
