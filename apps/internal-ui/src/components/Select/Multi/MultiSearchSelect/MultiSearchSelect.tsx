import { useId } from 'react';

import { Flex } from '@/components/Flex';
import MultiSearchSelectButton from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectButton';
import MultiSearchSelectSearchPanel from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectSearchPanel';
import MultiSearchSelectSelectedPanel from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectSelectedPanel';
import MultiSearchSelectWrapper from '@/components/Select/Multi/MultiSearchSelect/MultiSearchSelectWrapper';
import { MultiSearchSelectProps } from '@/components/Select/Multi/MultiSearchSelect/types';
import {
  MultiSelectBase,
  MultiSelectBaseValue,
} from '@/components/Select/Multi/shared';
import { MultiSelectBaseProvider } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import { SelectBase } from '@/components/Select/shared';

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
  hiddenLabel,
  onChange,
}: MultiSearchSelectProps<T>) => {
  const selectListResultId = useId();
  const selectedListResultId = useId();
  const labelId = useId();
  const controls = `${selectListResultId} ${selectedListResultId}`;

  return (
    <MultiSelectBaseProvider
      options={options}
      selectListResultId={selectListResultId}
      selectedListResultId={selectedListResultId}
      value={value}
      onChange={onChange}
    >
      <MultiSearchSelectWrapper
        label={
          <SelectBase.Label badge={badge} hidden={hiddenLabel} label={label} />
        }
        className={className}
        controls={controls}
        disabled={disabled}
        feedback={feedback}
        isError={isError}
        labelId={labelId}
        placeholder={placeholder}
        popoverOption={popoverOption}
        required={required}
      >
        {({ close }) => (
          <SelectBase.PopoverWrapper useMobile>
            <Flex
              className='in-tablet:min-w-[36.25rem] in-tablet:max-w-auto in-tablet:min-h-[34svh] in-tablet:max-h-[46svh] in-tablet:w-auto mx-auto h-full w-full max-w-[26.875rem] min-w-[22.5rem] justify-between'
              direction='column'
            >
              <MultiSelectBase
                className='in-tablet:min-h-[calc(34svh-4.125rem)] in-tablet:max-h-[calc(44svh-4.125rem)]'
                inputOption={inputOption}
                labelId={labelId}
                searchPanel={<MultiSearchSelectSearchPanel />}
                selectedPanel={<MultiSearchSelectSelectedPanel />}
              />
              <MultiSearchSelectButton close={close} />
            </Flex>
          </SelectBase.PopoverWrapper>
        )}
      </MultiSearchSelectWrapper>
    </MultiSelectBaseProvider>
  );
};

export default MultiSearchSelect;
