import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import { DATE_UNITS } from '@/date/calculations/constants';
import { DateIsBeforeParams } from '@/date/calculations/types';
import { timezone } from '@/date/core';

dayjs.extend(isSameOrBefore);

export const isBefore = ({
  date,
  target,
  unit = DATE_UNITS.DAY,
  isInclude = true,
}: DateIsBeforeParams) => {
  const _date = timezone({ date });

  return isInclude
    ? _date.isSameOrBefore(timezone({ date: target }), unit)
    : _date.isBefore(timezone({ date: target }), unit);
};
