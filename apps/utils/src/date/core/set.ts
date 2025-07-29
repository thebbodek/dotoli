import { DATE_UNITS } from '@/date/calculations/constants';
import { timezone } from '@/date/core/timezone';
import { DateSetParams } from '@/date/core/types';

export const set = ({ date, value, unit = DATE_UNITS.DAY }: DateSetParams) =>
  timezone({ date }).set(unit, value);
