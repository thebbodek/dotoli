import { toString } from '@bbodek/utils';

import { GetIsSameStartDateParams } from '@/components/Calendar/types';

export const getIsSameStartDate = ({
  dateString,
  internalValue,
}: GetIsSameStartDateParams) => {
  const { startDate = null } = internalValue ?? {};

  return startDate !== null && toString({ date: startDate }) === dateString;
};
