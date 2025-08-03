import { ReactNode } from 'react';

import { FILTER_TYPES } from '@/components/Filter/constants';
import { useFilterPanelContext } from '@/components/Filter/context/useFIlterPanelContext';
import FilterCalendarPanel from '@/components/Filter/FilterCalendarPanel';
import FilterMultiSelectPanel from '@/components/Filter/FilterMultiSelectPanel';
import FilterSingleSelectPanel from '@/components/Filter/FilterSingleSelectPanel';
import { FilterType } from '@/components/Filter/types';

const FilterSelectOptionPanel = () => {
  const { currentOptions } = useFilterPanelContext();
  const { type } = currentOptions!;

  const PANELS: Record<FilterType, ReactNode> = {
    [FILTER_TYPES.SINGLE_SELECT]: <FilterSingleSelectPanel />,
    [FILTER_TYPES.MULTI_SELECT]: <FilterMultiSelectPanel />,
    [FILTER_TYPES.DATE_SINGLE]: <FilterCalendarPanel />,
    [FILTER_TYPES.DATE_RANGE]: <FilterCalendarPanel />,
  };

  return PANELS[type];
};

export default FilterSelectOptionPanel;
