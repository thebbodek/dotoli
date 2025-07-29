import dayjs from 'dayjs';
import _isBetween from 'dayjs/plugin/isBetween';

import {
  DATE_IS_BETWEEN_RANGE,
  DATE_IS_BETWEEN_RANGE_ORIGINAL,
  DATE_UNITS,
} from '@/date/calculations/constants';
import { DateIsBetweenParams } from '@/date/calculations/types';
import { timezone } from '@/date/core';

dayjs.extend(_isBetween);

export const isBetween = ({
  date,
  from,
  to,
  unit = DATE_UNITS.DAY,
  range = DATE_IS_BETWEEN_RANGE.INCLUDE_INCLUDE,
}: DateIsBetweenParams) =>
  timezone({ date }).isBetween(
    timezone({ date: from }),
    timezone({ date: to }),
    unit,
    DATE_IS_BETWEEN_RANGE_ORIGINAL[range],
  );
