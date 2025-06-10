import { useId } from 'react';

import MultiSearchSelectButton from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectButton';
import MultiSearchSelectSearchPanel from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectSearchPanel';
import MultiSearchSelectSelectedPanel from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectSelectedPanel';
import MultiSearchSelectTrigger from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectTrigger';
import { MultiSearchSelectProps } from '@/components/Select/Multi/MultiSearchSelect/types';
import {
  MultiSelectBase,
  MultiSelectBaseValue,
} from '@/components/Select/Multi/shared';
import { MultiSelectBaseProvider } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import { SELECT_TYPE, SelectBase } from '@/components/Select/shared';

const MultiSearchSelect = <T extends MultiSelectBaseValue>({
  inputOption,
  popoverOption,
  value,
  label,
  badge,
  disabled,
  feedback,
  required,
  isError,
  placeholder,
  className,
  options,
  onChange,
}: MultiSearchSelectProps<T>) => {
  const selectListResultId = useId();
  const selectedListResultId = useId();
  const labelId = useId();
  const controls = `${selectListResultId} ${selectedListResultId}`;

  return (
    <MultiSelectBaseProvider
      onChange={onChange}
      value={value}
      options={options}
      selectListResultId={selectListResultId}
      selectedListResultId={selectedListResultId}
    >
      <SelectBase
        className={className}
        type={SELECT_TYPE.MULTI_SEARCH_SELECT}
        label={<SelectBase.Label badge={badge}>{label}</SelectBase.Label>}
        trigger={<MultiSearchSelectTrigger />}
        disabled={disabled}
        feedback={feedback}
        required={required}
        isError={isError}
        placeholder={placeholder}
        controls={controls}
        labelId={labelId}
        popoverOption={{
          ...popoverOption,
          useClickOutsideEvent: false,
        }}
      >
        {({ close }) => (
          <SelectBase.PopoverWrapper className='in-flex-v-stack in-tablet:block in-tablet:static in-tablet:inset-auto fixed inset-0 justify-between'>
            <MultiSelectBase
              labelId={labelId}
              inputOption={inputOption}
              searchPanel={<MultiSearchSelectSearchPanel />}
              selectedPanel={<MultiSearchSelectSelectedPanel />}
            />
            <MultiSearchSelectButton close={close} />
          </SelectBase.PopoverWrapper>
        )}
      </SelectBase>
    </MultiSelectBaseProvider>
  );
};

export default MultiSearchSelect;
