import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { DATE_COMPARE_DIRECTIONS } from '@/date/calculations/constants';
import { DateCompareParams } from '@/date/calculations/types';
import { timezone } from '@/date/core/timezone';

dayjs.extend(relativeTime);

export const compare = ({
  target,
  direction,
  isRelative = false,
}: DateCompareParams) => {
  const _target = timezone({ date: target });

  return direction === DATE_COMPARE_DIRECTIONS.FROM_NOW
    ? _target.fromNow(isRelative)
    : _target.toNow(isRelative);
};
