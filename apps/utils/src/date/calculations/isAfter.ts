import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import { DATE_UNITS } from '@/date/calculations/constants';
import { DateIsAfterParams } from '@/date/calculations/types';
import { timezone } from '@/date/core';

dayjs.extend(isSameOrAfter);

export const isAfter = ({
  date,
  target,
  unit = DATE_UNITS.DAY,
  isInclude = true,
}: DateIsAfterParams) => {
  const _date = timezone({ date });

  return isInclude
    ? _date.isSameOrAfter(timezone({ date: target }), unit)
    : _date.isAfter(timezone({ date: target }), unit);
};
