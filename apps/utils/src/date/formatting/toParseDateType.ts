import { timezone } from '@/date/core/timezone';
import { DATE_PARSE_TYPES } from '@/date/formatting/constants';
import {
  DateParseType,
  DateToParseDateTypeParams,
  ParseResult,
} from '@/date/formatting/types';

export const toParseDateType = <T extends DateParseType>({
  type,
  date,
}: DateToParseDateTypeParams<T>): ParseResult<T> => {
  const _date = timezone({ date });

  return (
    type !== DATE_PARSE_TYPES.UNIX ? _date : _date.unix()
  ) as ParseResult<T>;
};
