import dynamic from 'next/dynamic';

import { FILTER_STEPS } from '@/components/Filter/constants';
import { useFilterContext } from '@/components/Filter/context';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import FilterSelectOptionCategories from '@/components/Filter/FilterSelectOptionCategories';
import FilterToggleOption from '@/components/Filter/FilterToggleOption';
import { Flex } from '@/components/Flex';

const FilterSelectOptionPanel = dynamic(
  () => import('@/components/Filter/FilterSelectOptionPanel'),
  { ssr: false },
);

const FilterOptionPanel = () => {
  const { toggleOptions, selectOptions } = useFilterContext();
  const { filterStep } = useFilterPanelContext();
  const hasToggleOptions = toggleOptions.length > 0;
  const hasSelectOptions = selectOptions.length > 0;

  if (filterStep === FILTER_STEPS.IDLE) {
    return (
      <Flex className='w-[22.5rem] flex-1 overflow-hidden' direction='column'>
        {hasToggleOptions && <FilterToggleOption />}
        {hasSelectOptions && <FilterSelectOptionCategories />}
      </Flex>
    );
  }

  if (filterStep === FILTER_STEPS.SELECT_OPTION) {
    return <FilterSelectOptionPanel />;
  }

  return null;
};

export default FilterOptionPanel;
