import { timezone } from '@/date/core/timezone';
import { DateMonthParams } from '@/date/core/types';

export const month = (params?: DateMonthParams) => {
  const { date } = params ?? {};

  return timezone({ date }).month();
};
