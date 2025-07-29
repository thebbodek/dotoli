import { DATE_FORMATS, DATE_PARSE_TYPES } from '@/date/formatting/constants';
import { toParseDateType } from '@/date/formatting/toParseDateType';
import { DateToStringParams } from '@/date/formatting/types';

export const toString = ({
  date,
  format = DATE_FORMATS['YYYY-MM-DD'],
}: DateToStringParams) =>
  toParseDateType({ date, type: DATE_PARSE_TYPES.DAYJS }).format(format);
