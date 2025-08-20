import { FILTER_SELECT_OPTION_MAX_COUNT } from '@/components/Filter/constants';
import { useFilterContext } from '@/components/Filter/context';
import FilterSelectOptionLabels from '@/components/Filter/FilterSelectOptionSummaryBase';
import { FilterMultiSelectOptionSummaryProps } from '@/components/Filter/types';

const FilterMultiSelectOptionSummary = ({
  selectedValues,
  optionKey,
}: FilterMultiSelectOptionSummaryProps) => {
  const { selectOptions } = useFilterContext();
  const _selectOptions = selectOptions.find(
    (option) => option.key === optionKey,
  )!;
  const labels = selectedValues
    .slice(0, FILTER_SELECT_OPTION_MAX_COUNT)
    .map(
      (value) =>
        _selectOptions.options!.find((option) => option.value === value)!
          .displayValue,
    );
  const selectedValuesCount = selectedValues.length;
  const isOverflow = selectedValuesCount > FILTER_SELECT_OPTION_MAX_COUNT;

  return (
    <FilterSelectOptionLabels>
      <span className='truncate'>{labels.join('·')}</span>
      {isOverflow && (
        <span>+{selectedValuesCount - FILTER_SELECT_OPTION_MAX_COUNT}</span>
      )}
    </FilterSelectOptionLabels>
  );
};

export default FilterMultiSelectOptionSummary;
