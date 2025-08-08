import clsx from 'clsx';

import { InputSearch } from '@/components/Input';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import { useMultiSelectBaseInitialValueEffect } from '@/components/Select/Multi/shared/hooks';
import MultiSelectBaseSelectedHeader from '@/components/Select/Multi/shared/MultiSelectBaseSelectedHeader';
import { MultiSelectBaseProps } from '@/components/Select/Multi/shared/types';

const MultiSelectBase = ({
  className,
  labelId,
  searchPanel,
  selectedPanel,
  inputOption,
}: MultiSelectBaseProps) => {
  const { currentSearchValue, onSearch } = useMultiSelectBaseContext();
  const {
    placeholder: inputPlaceholder = '검색어를 입력해주세요',
    ...restInputOption
  } = inputOption ?? {};

  useMultiSelectBaseInitialValueEffect();

  return (
    <div
      aria-describedby={labelId}
      className={clsx(
        className,
        'in-tablet:in-flex-h-stack in-flex-v-stack flex-col-reverse overflow-auto',
      )}
    >
      <div className='in-flex-v-stack bg-in-white in-tablet:min-w-[21.875rem] in-tablet:p-4 overflow-hidden p-[1.25rem]'>
        <InputSearch
          {...restInputOption}
          label='검색'
          hiddenLabel
          className='in-tablet:mb-[0.875rem] mb-[1.125rem]'
          placeholder={inputPlaceholder}
          value={currentSearchValue ?? ''}
          onChange={(e) => onSearch({ value: e.target.value })}
        />
        {searchPanel}
      </div>
      <div className='bg-in-gray-01 in-flex-v-stack in-tablet:shrink-0 in-tablet:w-[14.375rem] in-tablet:gap-y-[0.625rem] in-tablet:p-4 gap-y-[0.75rem] p-[1.25rem]'>
        <MultiSelectBaseSelectedHeader />
        {selectedPanel}
      </div>
    </div>
  );
};

export default MultiSelectBase;
