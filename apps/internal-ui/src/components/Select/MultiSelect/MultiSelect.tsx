import { InputSearch } from '@/components/Input';
import { MultiSelectProvider } from '@/components/Select/MultiSelect/context/MultiSelectContext';
import MultiSelectCheckIcon from '@/components/Select/MultiSelect/MultiSelectCheckIcon';
import MultiSelectList from '@/components/Select/MultiSelect/MultiSelectList';
import MultiSelectListHeader from '@/components/Select/MultiSelect/MultiSelectListHeader';
import MultiSelectListItem from '@/components/Select/MultiSelect/MultiSelectListItem';
import MultiSelectOptionLabel from '@/components/Select/MultiSelect/MultiSelectOptionLabel';
import MultiSelectSelectedHeader from '@/components/Select/MultiSelect/MultiSelectSelectedHeader';
import MultiSelectSelectedList from '@/components/Select/MultiSelect/MultiSelectSelectedList';
import MultiSelectSelectedListItem from '@/components/Select/MultiSelect/MultiSelectSelectedListItem';
import {
  MultiSelectProps,
  MultiSelectValue,
} from '@/components/Select/MultiSelect/types';

const MultiSelect = <T extends MultiSelectValue>({
  searchPanel,
  selectedPanel,
  onSelect,
  onAllSelect,
  onRemove,
  selectedValues,
  inputOption,
}: MultiSelectProps<T>) => {
  const {
    placeholder: inputPlaceholder = '검색어를 입력해주세요',
    ...restInputOption
  } = inputOption;

  return (
    <MultiSelectProvider
      onRemove={onRemove}
      onSelect={onSelect}
      onAllSelect={onAllSelect}
      selectedValues={selectedValues}
    >
      <div className='md:flex-h-stack flex flex-col-reverse md:h-[25.5rem]'>
        <div className='flex-v-stack w-[22.5rem] bg-white p-[1.25rem] md:w-[23.75rem] md:p-4'>
          <InputSearch
            {...restInputOption}
            rootClassName='mb-[1.125rem] md:mb-[0.875rem]'
            placeholder={inputPlaceholder}
          />
          {searchPanel}
        </div>
        <div className='bg-gray-01 flex-v-stack h-[5.875rem] w-[22.5rem] gap-y-[0.75rem] p-[1.25rem] md:h-auto md:w-[12.5rem] md:gap-y-[0.625rem] md:p-4'>
          <MultiSelectSelectedHeader />
          {selectedPanel}
        </div>
      </div>
    </MultiSelectProvider>
  );
};

export default MultiSelect;

MultiSelect.displayName = 'MultiSelect';
MultiSelect.List = MultiSelectList;
MultiSelect.ListItem = MultiSelectListItem;
MultiSelect.CheckIcon = MultiSelectCheckIcon;
MultiSelect.ListHeader = MultiSelectListHeader;
MultiSelect.OptionsLabel = MultiSelectOptionLabel;
MultiSelect.SelectedList = MultiSelectSelectedList;
MultiSelect.SelectedListItem = MultiSelectSelectedListItem;
