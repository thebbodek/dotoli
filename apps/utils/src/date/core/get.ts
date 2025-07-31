import { DATE_UNITS } from '@/date/calculations/constants';
import { timezone } from '@/date/core/timezone';
import { DateGetParams } from '@/date/core/types';

export const get = (params?: DateGetParams) => {
  const { date, unit = DATE_UNITS.DAY } = params ?? {};

  return timezone({ date }).get(unit);
};
