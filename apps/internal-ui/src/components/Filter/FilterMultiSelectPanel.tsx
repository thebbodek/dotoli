import { useId } from 'react';

import FilterMultiSelectButton from '@/components/Filter/FilterMultiSelectButton';
import useFilterMultiSelectPanel from '@/components/Filter/hooks/useFilterMultiSelectPanel';
import { Flex } from '@/components/Flex';
import MultiSearchSelectSearchPanel from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectSearchPanel';
import MultiSearchSelectSelectedPanel from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectSelectedPanel';
import { MultiSelectBase } from '@/components/Select/Multi/shared';
import { MultiSelectBaseProvider } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';

const FilterMultiSelectPanel = () => {
  const labelId = useId();
  const selectListResultId = useId();
  const selectedListResultId = useId();
  const {
    models: { value, options },
    operations: { onChange },
  } = useFilterMultiSelectPanel();

  return (
    <MultiSelectBaseProvider
      onChange={onChange}
      value={value}
      options={options}
      selectListResultId={selectListResultId}
      selectedListResultId={selectedListResultId}
    >
      <Flex
        direction='column'
        className='in-tablet:min-w-[36.25rem] mx-auto w-[22.5rem] flex-1 justify-between overflow-hidden'
      >
        <MultiSelectBase
          className='in-tablet:min-h-[calc(34svh-3.75rem)] in-tablet:max-h-[calc(46svh-3.75rem)] h-[100svh-4rem]'
          labelId={labelId}
          searchPanel={<MultiSearchSelectSearchPanel />}
          selectedPanel={<MultiSearchSelectSelectedPanel />}
        />
        <FilterMultiSelectButton />
      </Flex>
    </MultiSelectBaseProvider>
  );
};

export default FilterMultiSelectPanel;
