import { DATE_UNITS } from '@/date/calculations/constants';
import { DateAddParams } from '@/date/calculations/types';
import { timezone } from '@/date/core';

export const add = ({ date, value, unit = DATE_UNITS.DAY }: DateAddParams) =>
  timezone({ date }).add(value, unit);
