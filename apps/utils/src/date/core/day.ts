import { timezone } from '@/date/core/timezone';
import { DateDayParams } from '@/date/core/types';

export const day = (params?: DateDayParams) => {
  const { date } = params ?? {};

  return timezone({ date }).day();
};
