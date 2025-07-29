import { DATE_UNITS } from '@/date/calculations/constants';
import { timezone } from '@/date/core/timezone';
import { DateStartOfParams } from '@/date/core/types';

export const startOf = ({ date, unit = DATE_UNITS.DAY }: DateStartOfParams) =>
  timezone({ date }).startOf(unit);
