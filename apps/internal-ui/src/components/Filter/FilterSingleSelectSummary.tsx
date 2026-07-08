import { useFilterContext } from '@/components/Filter/context';
import FilterSelectOptionLabels from '@/components/Filter/FilterSelectOptionSummaryBase';
import { FilterSingleSelectSummaryProps } from '@/components/Filter/types';

const FilterSingleSelectSummary = ({
  selectedValues,
  optionKey,
}: FilterSingleSelectSummaryProps) => {
  const { selectOptions } = useFilterContext();
  const selectedValue = selectedValues[0];
  const option = selectOptions.find(({ key }) => key === optionKey)!;
  const label =
    option.options?.find(({ value }) => value === selectedValue)
      ?.displayValue ?? selectedValue;

  return (
    <FilterSelectOptionLabels>
      <span className='truncate'>{label}</span>
    </FilterSelectOptionLabels>
  );
};

export default FilterSingleSelectSummary;
