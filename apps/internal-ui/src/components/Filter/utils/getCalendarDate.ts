import { FILTER_DATE_RANGE_DELIMITER } from '@/components/Filter/constants';
import { FilterSelectOption } from '@/components/Filter/types';

export const getCalendarDate = ({
  value,
}: {
  value: FilterSelectOption['value'][];
}) => {
  const [startDate, endDate = startDate] = value[0].split(
    FILTER_DATE_RANGE_DELIMITER,
  );

  return {
    startDate,
    endDate,
  };
};
