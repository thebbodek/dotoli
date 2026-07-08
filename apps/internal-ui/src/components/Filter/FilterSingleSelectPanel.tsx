import { noop } from 'es-toolkit';
import { ChangeEvent, useId, useState } from 'react';

import useFilterSingleSelectPanel from '@/components/Filter/hooks/useFilterSingleSelectPanel';
import { Flex } from '@/components/Flex';
import { InputSearch } from '@/components/Input';
import { SelectBaseListEmpty } from '@/components/Select/shared';
import {
  SingleSelectBaseItem,
  SingleSelectBaseList,
  SingleSelectListProvider,
} from '@/components/Select/Single/shared';

const parseSearchValue = (value: string) =>
  value.replaceAll(' ', '').toLowerCase();

const FilterSingleSelectPanel = () => {
  const id = useId();
  const labelId = useId();
  const [searchValue, setSearchValue] = useState('');
  const {
    models: { value, options },
    operations: { onSelect },
  } = useFilterSingleSelectPanel();

  const filteredOptions = options.filter(({ label }) =>
    parseSearchValue(label).includes(parseSearchValue(searchValue)),
  );
  const hasFilteredOptions = filteredOptions.length > 0;

  const onSearchChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchValue(e.target.value);
  };

  return (
    <SingleSelectListProvider
      close={noop}
      id={id}
      labelId={labelId}
      value={value}
      onSelect={onSelect}
    >
      <Flex
        className='in-tablet:min-w-[23.75rem] mx-auto max-h-[19rem] w-[22.5rem] gap-y-[0.875rem] overflow-hidden p-[0.875rem]'
        direction='column'
      >
        <InputSearch
          label='검색'
          placeholder='검색어를 입력해주세요'
          value={searchValue}
          hiddenLabel
          onChange={onSearchChange}
        />
        <SingleSelectBaseList>
          {hasFilteredOptions ? (
            filteredOptions.map(({ value: optionValue, label }) => (
              <SingleSelectBaseItem
                key={optionValue}
                label={label}
                value={optionValue}
              >
                {label}
              </SingleSelectBaseItem>
            ))
          ) : (
            <SelectBaseListEmpty />
          )}
        </SingleSelectBaseList>
      </Flex>
    </SingleSelectListProvider>
  );
};

export default FilterSingleSelectPanel;
