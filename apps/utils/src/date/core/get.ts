import { DATE_UNITS } from '@/date/calculations/constants';
import { timezone } from '@/date/core/timezone';
import { DateGetParams } from '@/date/core/types';

export const get = ({ date, unit = DATE_UNITS.DAY }: DateGetParams) =>
  timezone({ date }).get(unit);
