import FilterSelectOptionLabels from '@/components/Filter/FilterSelectOptionSummaryBase';
import { FilterInputSummaryProps } from '@/components/Filter/types';

const FilterInputSummary = ({ selectedValues }: FilterInputSummaryProps) => {
  return (
    <FilterSelectOptionLabels>
      <span className='truncate'>{selectedValues[0]}</span>
    </FilterSelectOptionLabels>
  );
};

export default FilterInputSummary;
