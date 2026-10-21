import { CALENDAR_VARIANTS } from '@/components/Calendar';
import { FILTER_DATE_RANGE_DELIMITER } from '@/components/Filter/constants';
import { GetCalendarFilterValueParams } from '@/components/Filter/types';

export const getCalendarFilterValue = ({
  value,
  variant,
}: GetCalendarFilterValueParams) => {
  if (value === null || value.startDate === null) return null;

  if (variant === CALENDAR_VARIANTS.SINGLE) return [value.startDate];

  if (value.endDate === null) return null;

  return [`${value.startDate}${FILTER_DATE_RANGE_DELIMITER}${value.endDate}`];
};
