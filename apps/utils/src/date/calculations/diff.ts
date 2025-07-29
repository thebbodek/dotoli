import { DATE_UNITS } from '@/date/calculations/constants';
import { DateDiffParams } from '@/date/calculations/types';
import { timezone } from '@/date/core/timezone';

export const diff = ({ date, target, unit = DATE_UNITS.DAY }: DateDiffParams) =>
  timezone({ date }).diff(timezone({ date: target }), unit);
