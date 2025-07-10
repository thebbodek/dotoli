import { InputSearch } from '@/components/Input';
import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import MultiSelectBaseSelectedHeader from '@/components/Select/Multi/shared/MultiSelectBaseSelectedHeader';
import { MultiSelectBaseProps } from '@/components/Select/Multi/shared/types';

const MultiSelectBase = ({
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
      className='in-tablet:in-flex-h-stack in-tablet:h-[25.5rem] in-flex-v-stack h-auto flex-col-reverse'
    >
      <div className='in-flex-v-stack bg-in-white in-tablet:w-[23.75rem] in-tablet:p-4 w-[22.5rem] overflow-hidden p-[1.25rem]'>
        <InputSearch
          {...restInputOption}
          rootClassName='mb-[1.125rem] in-tablet:mb-[0.875rem]'
          placeholder={inputPlaceholder}
          value={currentSearchValue ?? ''}
          onChange={(e) => onSearch({ value: e.target.value })}
        />
        {searchPanel}
      </div>
      <div className='bg-in-gray-01 in-flex-v-stack in-tablet:h-auto in-tablet:w-[12.5rem] in-tablet:gap-y-[0.625rem] in-tablet:p-4 h-[5.875rem] w-[22.5rem] gap-y-[0.75rem] p-[1.25rem]'>
        <MultiSelectBaseSelectedHeader />
        {selectedPanel}
      </div>
    </div>
  );
};

export default MultiSelectBase;
