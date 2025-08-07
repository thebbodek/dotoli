import dayjs from 'dayjs';
import _minMax from 'dayjs/plugin/minMax';

import {
  DateMaxParams,
  DateMinMaxParams,
  DateMinParams,
} from '@/date/calculations/types';
import { timezone } from '@/date/core/timezone';
import { DateValue } from '@/date/core/types';

dayjs.extend(_minMax);

export const min = ({ dates }: DateMinParams) => {
  const _dates = dates.map((date) => timezone({ date }));

  return timezone({ date: dayjs.min(..._dates) as DateValue });
};

export const max = ({ dates }: DateMaxParams) => {
  const _dates = dates.map((date) => timezone({ date }));

  return timezone({ date: dayjs.max(..._dates) as DateValue });
};

export const minMax = ({ dates }: DateMinMaxParams) => ({
  min: min({ dates }),
  max: max({ dates }),
});
