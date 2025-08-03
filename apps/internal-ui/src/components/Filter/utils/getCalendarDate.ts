import { FilterSelectOption } from '@/components/Filter/types';

export const getCalendarDate = ({
  value,
}: {
  value: FilterSelectOption['value'][];
}) => {
  const [startDate, endDate] = value[0].split('~');

  return {
    startDate,
    endDate,
  };
};
