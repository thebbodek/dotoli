import { DATE_UNITS } from '@/date/calculations/constants';
import { DateSubtractParams } from '@/date/calculations/types';
import { timezone } from '@/date/core';

export const subtract = ({
  date,
  value,
  unit = DATE_UNITS.DAY,
}: DateSubtractParams) => timezone({ date }).subtract(value, unit);
