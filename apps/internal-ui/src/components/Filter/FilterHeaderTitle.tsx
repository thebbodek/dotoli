import { FILTER_STEPS } from '@/components/Filter/constants';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import { MultiSelectHeaderTitle } from '@/components/Select/Multi/shared';

const FilterHeaderTitle = () => {
  const { filterStep, currentOptions } = useFilterPanelContext();
  const title =
    filterStep === FILTER_STEPS.IDLE ? '필터' : currentOptions!.label;

  return <MultiSelectHeaderTitle>{title}</MultiSelectHeaderTitle>;
};

export default FilterHeaderTitle;
