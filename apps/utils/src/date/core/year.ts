import { timezone } from '@/date/core/timezone';
import { DateYearParams } from '@/date/core/types';

export const year = (params?: DateYearParams) => {
  const { date } = params ?? {};

  return timezone({ date }).year();
};
