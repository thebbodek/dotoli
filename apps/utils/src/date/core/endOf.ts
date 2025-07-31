import { DATE_UNITS } from '@/date/calculations/constants';
import { timezone } from '@/date/core/timezone';
import { DateEndOfParams } from '@/date/core/types';

export const endOf = (params?: DateEndOfParams) => {
  const { date, unit = DATE_UNITS.DAY } = params ?? {};

  return timezone({ date }).endOf(unit);
};
