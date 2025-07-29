import { DATE_UNITS } from '@/date/calculations/constants';
import { DateIsSameParams } from '@/date/calculations/types';
import { timezone } from '@/date/core';

export const isSame = ({
  date,
  target,
  unit = DATE_UNITS.DAY,
}: DateIsSameParams) =>
  timezone({ date }).isSame(timezone({ date: target }), unit);
