import {
  FILTER_SELECT_OPTION_MAX_COUNT,
  FILTER_STEPS,
} from '@/components/Filter/constants';
import { useFilterContext } from '@/components/Filter/context';
import { useFilterPanelContext } from '@/components/Filter/context/useFIlterPanelContext';
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
  const selectedValuesCount = selectedValues?.length ?? 0;
  const hasSelectedValue = selectedValues !== null;
  const isOverflow =
    hasSelectedValue && selectedValuesCount > FILTER_SELECT_OPTION_MAX_COUNT;
  const _selectedValues =
    selectedValues?.slice(0, FILTER_SELECT_OPTION_MAX_COUNT) ?? [];

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
        className='mr-auto'
        variant={TYPOGRAPHY_VARIANTS.BODY_14_M}
      >
        {label}
      </Typography>
      {hasSelectedValue && (
        <Typography
          className='in-flex-h-stack bg-in-primary-02 mx-2 gap-x-1 truncate px-1'
          color='primary-05'
          variant={TYPOGRAPHY_VARIANTS.BODY_14_M}
        >
          {_selectedValues.join('·')}
          {isOverflow && (
            <span>+{selectedValuesCount - FILTER_SELECT_OPTION_MAX_COUNT}</span>
          )}
        </Typography>
      )}
      <Icon iconKey='caret-right' className='text-in-gray-05 text-[1rem]' />
    </li>
  );
};

export default FilterSelectOptionCategory;
