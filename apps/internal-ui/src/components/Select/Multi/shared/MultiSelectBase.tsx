import clsx from 'clsx';

import { InputSearch } from '@/components/Input';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
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

  return (
    <div
      aria-describedby={labelId}
      className={clsx(
        className,
        'in-tablet:in-flex-h-stack in-flex-v-stack flex-1 flex-col-reverse overflow-auto',
      )}
    >
      <div className='in-flex-v-stack bg-in-white in-tablet:w-[21.875rem] in-tablet:p-4 flex-1 overflow-hidden p-[1.25rem]'>
        <InputSearch
          {...restInputOption}
          rootClassName='mb-[1.125rem] in-tablet:mb-[0.875rem]'
          placeholder={inputPlaceholder}
          value={currentSearchValue ?? ''}
          onChange={(e) => onSearch({ value: e.target.value })}
        />
        {searchPanel}
      </div>
      <div className='bg-in-gray-01 in-flex-v-stack in-tablet:w-[14.375rem] in-tablet:gap-y-[0.625rem] in-tablet:p-4 gap-y-[0.75rem] p-[1.25rem]'>
        <MultiSelectBaseSelectedHeader />
        {selectedPanel}
      </div>
    </div>
  );
};

export default MultiSelectBase;
