import clsx from 'clsx';
import { KeyboardEvent } from 'react';

import { FILTER_STEPS } from '@/components/Filter/constants';
import { useFilterContext } from '@/components/Filter/context';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import FilterOptionSummary from '@/components/Filter/FilterOptionSummary';
import { FilterSelectOptionCategoryProps } from '@/components/Filter/types';
import { Icon } from '@/components/Icon';
import { Typography } from '@/components/Typography';
import { COLOR_VARIANTS, TYPOGRAPHY_VARIANTS } from '@/variants';

const FilterSelectOptionCategory = ({
  label,
  optionKey,
  options,
  type,
  numericOption,
  placeholder,
  disabled,
}: FilterSelectOptionCategoryProps) => {
  const { selectValues } = useFilterContext();
  const { setFilterStep, setCurrentOptions } = useFilterPanelContext();
  const selectedValues = selectValues?.[optionKey];

  const onClick = () => {
    if (disabled) return;

    setFilterStep(FILTER_STEPS.SELECT_OPTION);
    setCurrentOptions({
      key: optionKey,
      label,
      options,
      type,
      numericOption,
      placeholder,
      disabled,
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      onClick();
    }
  };

  return (
    <li
      className={clsx(
        'in-flex-h-stack in-tablet:px-3 in-tablet:h-[2rem] h-[2.75rem] flex-none items-center px-4',
        disabled && 'cursor-not-allowed',
      )}
      aria-disabled={disabled}
      role='button'
      tabIndex={disabled ? -1 : 0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <Typography
        className='mr-auto shrink-0'
        color={disabled ? COLOR_VARIANTS.GRAY_05 : COLOR_VARIANTS.BLACK}
        variant={TYPOGRAPHY_VARIANTS.BODY_14_M}
      >
        {label}
      </Typography>
      {selectedValues && (
        <FilterOptionSummary
          optionKey={optionKey}
          selectedValues={selectedValues}
          type={type}
        />
      )}
      <Icon className='text-in-gray-05 text-[1rem]' iconKey='caret-right' />
    </li>
  );
};

export default FilterSelectOptionCategory;
