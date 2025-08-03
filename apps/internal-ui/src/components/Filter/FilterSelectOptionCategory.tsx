import { FILTER_STEPS, FILTER_TYPES } from '@/components/Filter/constants';
import { useFilterContext } from '@/components/Filter/context';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import FilterCalendarSummary from '@/components/Filter/FilterCalendarSummary';
import FilterMultiSelectOptionSummary from '@/components/Filter/FilterMultiSelectOptionSummary';
import { FilterSelectOptionCategoryProps } from '@/components/Filter/types';
import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const FilterSelectOptionCategory = ({
  label,
  optionKey,
  options,
  type,
}: FilterSelectOptionCategoryProps) => {
  const { selectValues } = useFilterContext();
  const { setFilterStep, setCurrentOptions } = useFilterPanelContext();
  const selectedValues = selectValues?.[optionKey];

  const onClick = () => {
    setFilterStep(FILTER_STEPS.SELECT_OPTION);
    setCurrentOptions({
      key: optionKey,
      label,
      options,
      type,
    });
  };

  return (
    <li
      className='in-flex-h-stack in-tablet:px-3 in-tablet:h-[2rem] h-[2.75rem] items-center px-4'
      role='button'
      onClick={onClick}
    >
      <Typography
        color='black'
        className='mr-auto shrink-0'
        variant={TYPOGRAPHY_VARIANTS.BODY_14_M}
      >
        {label}
      </Typography>
      {selectedValues &&
        (type === FILTER_TYPES.MULTI_SELECT ? (
          <FilterMultiSelectOptionSummary
            selectedValues={selectedValues}
            optionKey={optionKey}
          />
        ) : (
          <FilterCalendarSummary selectedValues={selectedValues} type={type} />
        ))}
      <Icon iconKey='caret-right' className='text-in-gray-05 text-[1rem]' />
    </li>
  );
};

export default FilterSelectOptionCategory;
