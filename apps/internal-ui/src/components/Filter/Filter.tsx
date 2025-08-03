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
      toggleValues={toggleValues}
      toggleOptions={toggleOptions}
      selectValues={selectValues}
      selectOptions={selectOptions}
      onChange={onChange}
    >
      <SelectBase
        className={className}
        type={SELECT_TYPE.MULTI_SEARCH_SELECT}
        label={<SelectBase.Label label={label} hidden />}
        trigger={<FilterTrigger />}
        disabled={disabled}
        controls={selectListId}
        labelId={labelId}
        popoverOption={{
          ...popoverOption,
          useClickOutsideEvent: false,
        }}
      >
        {({ close }) => (
          <SelectBase.PopoverWrapper useMobile>
            <FilterPanelProvider>
              <Flex
                direction='column'
                className='in-tablet:min-h-[34svh] in-tablet:max-h-[46svh] in-tablet:w-auto mx-auto h-full w-[22.5rem]'
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
