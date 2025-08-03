import { FILTER_STEPS } from '@/components/Filter/constants';
import { useFilterPanelContext } from '@/components/Filter/context/useFIlterPanelContext';
import FilterHeaderBackButton from '@/components/Filter/FilterHeaderBackButton';
import FilterHeaderCloseButton from '@/components/Filter/FIlterHeaderCloseButton';
import FilterHeaderMobileCloseButton from '@/components/Filter/FIlterHeaderMobileCloseButton';
import FilterHeaderResetButton from '@/components/Filter/FilterHeaderResetButton';
import FilterHeaderTitle from '@/components/Filter/FIlterHeaderTitle';
import { FilterHeaderProps } from '@/components/Filter/types';
import { Flex } from '@/components/Flex';

const FilterHeader = ({ close }: FilterHeaderProps) => {
  const { filterStep } = useFilterPanelContext();

  return (
    <Flex
      as='header'
      className='border-b-in-gray-02 in-tablet:px-4 in-tablet:max-h-[3.75rem] max-h-[4rem] flex-1 border-b px-5'
      align={{ items: 'center' }}
    >
      {filterStep === FILTER_STEPS.IDLE && (
        <FilterHeaderMobileCloseButton close={close} />
      )}
      {filterStep === FILTER_STEPS.SELECT_OPTION && <FilterHeaderBackButton />}
      <FilterHeaderTitle />
      <FilterHeaderResetButton />
      <FilterHeaderCloseButton close={close} />
    </Flex>
  );
};

export default FilterHeader;
