import { CALENDAR_WEEKS_COUNT } from '@/components/Calendar/constants';
import { GetIsEmptyMonthlyRowParams } from '@/components/Calendar/types';

export const getIsEmptyMonthlyRow = ({
  daysOfMonth,
  daysIndex,
}: GetIsEmptyMonthlyRowParams) => {
  const firstDayIndex = daysIndex * CALENDAR_WEEKS_COUNT;

  return daysOfMonth
    .slice(firstDayIndex, firstDayIndex + CALENDAR_WEEKS_COUNT)
    .every((snapshot) => snapshot === null);
};
