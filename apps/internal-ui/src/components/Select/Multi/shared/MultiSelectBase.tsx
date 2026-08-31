import clsx from 'clsx';

import { InputSearch } from '@/components/Input';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import { useMultiSelectBaseInitialValueEffect } from '@/components/Select/Multi/shared/hooks';
import MultiSelectBaseSelectedHeader from '@/components/Select/Multi/shared/MultiSelectBaseSelectedHeader';
import { MultiSelectBaseProps } from '@/components/Select/Multi/shared/types';
import { useSelectKeyboardNavigation } from '@/components/Select/shared';

const MultiSelectBase = ({
  className,
  labelId,
  searchPanel,
  selectedPanel,
  inputOption,
}: MultiSelectBaseProps) => {
  const { currentSearchValue, onSearch } = useMultiSelectBaseContext();
  const { focusContainerRef, onKeyDown } = useSelectKeyboardNavigation();
  const {
    placeholder: inputPlaceholder = '검색어를 입력해주세요',
    ...restInputOption
  } = inputOption ?? {};

  useMultiSelectBaseInitialValueEffect();

  return (
    <div
      className={clsx(
        className,
        'in-tablet:min-h-[calc(34svh-4.125rem)] in-tablet:max-h-[calc(44svh-4.125rem)] in-tablet:in-flex-h-stack in-flex-v-stack flex-col-reverse overflow-auto',
      )}
      aria-describedby={labelId}
    >
      <div
        className='in-flex-v-stack bg-in-white in-tablet:min-w-[21.875rem] in-tablet:p-4 overflow-hidden p-[1.25rem] focus:outline-none'
        ref={focusContainerRef}
        tabIndex={-1}
        onKeyDown={onKeyDown}
      >
        <InputSearch
          {...restInputOption}
          className='in-tablet:mb-[0.875rem] mb-[1.125rem]'
          label='검색'
          placeholder={inputPlaceholder}
          value={currentSearchValue ?? ''}
          autoFocus
          hiddenLabel
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
