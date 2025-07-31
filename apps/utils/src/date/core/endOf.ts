import { DATE_UNITS } from '@/date/calculations/constants';
import { timezone } from '@/date/core/timezone';
import { DateEndOfParams } from '@/date/core/types';

export const endOf = ({ date, unit = DATE_UNITS.DAY }: DateEndOfParams) =>
  timezone({ date }).endOf(unit);
