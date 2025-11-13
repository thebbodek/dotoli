import { useId } from 'react';

import { FilterProvider } from '@/components/Filter/context';
import { FilterPanelProvider } from '@/components/Filter/context/useFilterPanelContext';
import FilterHeader from '@/components/Filter/FilterHeader';
import FilterOptionPanel from '@/components/Filter/FilterOptionPanel';
import FilterTrigger from '@/components/Filter/FilterTrigger';
import { FilterProps } from '@/components/Filter/types';
import { Flex } from '@/components/Flex';
import { SELECT_TYPE } from '@/components/Select';
import { SelectBase } from '@/components/Select/shared';

const Filter = ({
  className,
  label,
  disabled,
  popoverOption,
  toggleValues,
  toggleOptions,
  selectValues,
  selectOptions,
  onChange,
}: FilterProps) => {
  const labelId = useId();
  const selectListId = useId();

  return (
    <FilterProvider
      selectOptions={selectOptions}
      selectValues={selectValues}
      toggleOptions={toggleOptions}
      toggleValues={toggleValues}
      onChange={onChange}
    >
      <SelectBase
        popoverOption={{
          ...popoverOption,
          useClickOutsideEvent: false,
        }}
        className={className}
        controls={selectListId}
        disabled={disabled}
        label={<SelectBase.Label label={label} hidden />}
        labelId={labelId}
        trigger={<FilterTrigger />}
        type={SELECT_TYPE.MULTI_SEARCH_SELECT}
      >
        {({ close }) => (
          <SelectBase.PopoverWrapper useMobile>
            <FilterPanelProvider>
              <Flex
                className='in-tablet:min-h-[34svh] in-tablet:max-h-[46svh] in-tablet:w-auto mx-auto h-full w-[22.5rem]'
                direction='column'
              >
                <FilterHeader close={close} />
                <FilterOptionPanel />
              </Flex>
            </FilterPanelProvider>
          </SelectBase.PopoverWrapper>
        )}
      </SelectBase>
    </FilterProvider>
  );
};

export default Filter;
