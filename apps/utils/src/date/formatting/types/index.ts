import { Dayjs } from 'dayjs';

import { DateTimeZoneParams } from '@/date/core/types';
import { DATE_FORMATS, DATE_PARSE_TYPES } from '@/date/formatting/constants';

export type DateFormatType = (typeof DATE_FORMATS)[keyof typeof DATE_FORMATS];

export type DateParseType =
  (typeof DATE_PARSE_TYPES)[keyof typeof DATE_PARSE_TYPES];

export interface DateToParseDateTypeParams<T extends DateParseType>
  extends Pick<DateTimeZoneParams, 'date'> {
  type: T;
}

export type ParseResult<T extends DateParseType> =
  T extends typeof DATE_PARSE_TYPES.UNIX ? number : Dayjs;

export interface DateToStringParams
  extends Omit<DateTimeZoneParams, 'isStrict'> {}
