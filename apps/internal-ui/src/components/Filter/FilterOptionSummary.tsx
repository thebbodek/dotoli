import { FILTER_TYPES } from '@/components/Filter/constants';
import FilterCalendarSummary from '@/components/Filter/FilterCalendarSummary';
import FilterInputSummary from '@/components/Filter/FilterInputSummary';
import FilterMultiSelectOptionSummary from '@/components/Filter/FilterMultiSelectOptionSummary';
import FilterSingleSelectSummary from '@/components/Filter/FilterSingleSelectSummary';
import { FilterOptionSummaryProps } from '@/components/Filter/types';

const FilterOptionSummary = ({
  type,
  optionKey,
  selectedValues,
}: FilterOptionSummaryProps) => {
  if (type === FILTER_TYPES.MULTI_SELECT) {
    return (
      <FilterMultiSelectOptionSummary
        optionKey={optionKey}
        selectedValues={selectedValues}
      />
    );
  }

  if (type === FILTER_TYPES.SINGLE_SELECT) {
    return (
      <FilterSingleSelectSummary
        optionKey={optionKey}
        selectedValues={selectedValues}
      />
    );
  }

  if (type === FILTER_TYPES.DATE_SINGLE || type === FILTER_TYPES.DATE_RANGE) {
    return (
      <FilterCalendarSummary selectedValues={selectedValues} type={type} />
    );
  }

  return <FilterInputSummary selectedValues={selectedValues} />;
};

export default FilterOptionSummary;
