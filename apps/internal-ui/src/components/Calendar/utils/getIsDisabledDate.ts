import { GetIsDisabledDateParams } from '@/components/Calendar/types';

export const getIsDisabledDate = ({
  dateString,
  minDateString,
  maxDateString,
  disabledDaysSet,
}: GetIsDisabledDateParams) => {
  if (disabledDaysSet.has(dateString)) return true;

  if (minDateString !== null && dateString < minDateString) return true;

  if (maxDateString !== null && dateString > maxDateString) return true;

  return false;
};
