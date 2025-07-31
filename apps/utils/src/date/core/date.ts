import { timezone } from '@/date/core/timezone';
import { DateDateParams } from '@/date/core/types';

export const date = (params?: DateDateParams) => {
  const { date } = params ?? {};

  return timezone({ date }).date();
};
