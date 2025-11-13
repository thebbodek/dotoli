import { FILTER_STEPS } from '@/components/Filter/constants';
import { useFilterPanelContext } from '@/components/Filter/context/useFilterPanelContext';
import FilterHeaderBackButton from '@/components/Filter/FilterHeaderBackButton';
import FilterHeaderCloseButton from '@/components/Filter/FilterHeaderCloseButton';
import FilterHeaderMobileCloseButton from '@/components/Filter/FilterHeaderMobileCloseButton';
import FilterHeaderResetButton from '@/components/Filter/FilterHeaderResetButton';
import FilterHeaderTitle from '@/components/Filter/FilterHeaderTitle';
import { FilterHeaderProps } from '@/components/Filter/types';
import { Flex } from '@/components/Flex';

const FilterHeader = ({ close }: FilterHeaderProps) => {
  const { filterStep } = useFilterPanelContext();

  return (
    <Flex
      align={{ items: 'center' }}
      as='header'
      className='border-b-in-gray-02 in-tablet:px-4 in-tablet:h-[3.75rem] h-[4rem] border-b px-5'
      shrink='0'
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
