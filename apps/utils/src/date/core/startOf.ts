import { DATE_UNITS } from '@/date/calculations/constants';
import { timezone } from '@/date/core/timezone';
import { DateStartOfParams } from '@/date/core/types';

export const startOf = (params?: DateStartOfParams) => {
  const { date, unit = DATE_UNITS.DAY } = params ?? {};

  return timezone({ date }).startOf(unit);
};
