import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

import { CALENDAR_VARIANTS } from '@/components/Calendar';
import { FILTER_TYPES } from '@/components/Filter/constants';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import { FilterType } from '@/components/Filter/types';

const FilterMultiSelectPanel = dynamic(
  () => import('@/components/Filter/FilterMultiSelectPanel'),
  { ssr: false },
);
const FilterCalendarPanel = dynamic(
  () => import('@/components/Filter/FilterCalendarPanel'),
  { ssr: false },
);

const FilterSelectOptionPanel = () => {
  const { currentOptions } = useFilterPanelContext();
  const { type } = currentOptions!;

  const PANELS: Record<FilterType, ReactNode> = {
    [FILTER_TYPES.MULTI_SELECT]: <FilterMultiSelectPanel />,
    [FILTER_TYPES.DATE_SINGLE]: (
      <FilterCalendarPanel variant={CALENDAR_VARIANTS.SINGLE} />
    ),
    [FILTER_TYPES.DATE_RANGE]: (
      <FilterCalendarPanel variant={CALENDAR_VARIANTS.RANGE} />
    ),
  };

  return PANELS[type];
};

export default FilterSelectOptionPanel;
