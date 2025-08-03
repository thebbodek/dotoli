import { FILTER_TYPES } from '@/components/Filter/constants';
import FilterSelectOptionLabels from '@/components/Filter/FilterSelectOptionSummaryBase';
import { FilterCalendarSummaryProps } from '@/components/Filter/types';
import { getCalendarDate } from '@/components/Filter/utils';

const FilterCalendarSummary = ({
  selectedValues,
  type,
}: FilterCalendarSummaryProps) => {
  const { startDate, endDate } = getCalendarDate({ value: selectedValues });
  const summary =
    type === FILTER_TYPES.DATE_SINGLE ? startDate : `${startDate} ~ ${endDate}`;

  return (
    <FilterSelectOptionLabels>
      <span className='truncate'>{summary}</span>
    </FilterSelectOptionLabels>
  );
};

export default FilterCalendarSummary;
