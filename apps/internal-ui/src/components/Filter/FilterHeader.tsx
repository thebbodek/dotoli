import { FILTER_STEPS } from '@/components/Filter/constants';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import FilterHeaderBackButton from '@/components/Filter/FilterHeaderBackButton';
import FilterHeaderCloseButton from '@/components/Filter/FilterHeaderCloseButton';
import FilterHeaderMobileCloseButton from '@/components/Filter/FilterHeaderMobileCloseButton';
import FilterHeaderResetButton from '@/components/Filter/FilterHeaderResetButton';
import FilterHeaderTitle from '@/components/Filter/FilterHeaderTitle';
import { FilterHeaderProps } from '@/components/Filter/types';
import { MultiSelectHeader } from '@/components/Select/Multi/shared';

const FilterHeader = ({ close }: FilterHeaderProps) => {
  const { filterStep } = useFilterPanelContext();

  return (
    <MultiSelectHeader>
      {filterStep === FILTER_STEPS.IDLE && (
        <FilterHeaderMobileCloseButton close={close} />
      )}
      {filterStep === FILTER_STEPS.SELECT_OPTION && <FilterHeaderBackButton />}
      <FilterHeaderTitle />
      <FilterHeaderResetButton />
      <FilterHeaderCloseButton close={close} />
    </MultiSelectHeader>
  );
};

export default FilterHeader;
