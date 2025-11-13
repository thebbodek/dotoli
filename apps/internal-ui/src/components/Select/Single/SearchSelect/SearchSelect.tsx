import { Children, PropsWithChildren } from 'react';

import { InputSearch } from '@/components/Input';
import { SELECT_TYPE, SelectBaseListEmpty } from '@/components/Select/shared';
import SearchSelectItem from '@/components/Select/Single/SearchSelect/SearchSelectItem';
import { SearchSelectProps } from '@/components/Select/Single/SearchSelect/types';
import {
  SingleSelectBase,
  SingleSelectBaseList,
} from '@/components/Select/Single/shared';
import { SelectValue } from '@/components/Select/Single/shared/types';

const SearchSelect = <T extends SelectValue>({
  label,
  hiddenLabel,
  badge,
  children,
  feedback,
  className,
  placeholder,
  isError = false,
  disabled = false,
  required = false,
  popoverOption,
  inputOption,
  onSelect,
  displayValue,
  value,
  useReset,
}: PropsWithChildren<SearchSelectProps<T>>) => {
  const {
    placeholder: inputPlaceholder = '검색어를 입력해주세요',
    value: searchValue = null,
    ...restInputOption
  } = inputOption ?? {};
  const hasChildren = Children.count(children) > 0;

  return (
    <SingleSelectBase
      badge={badge}
      className={className}
      disabled={disabled}
      displayValue={displayValue}
      feedback={feedback}
      hiddenLabel={hiddenLabel}
      isError={isError}
      label={label}
      placeholder={placeholder}
      popoverOption={popoverOption}
      popoverWrapperClassName='max-h-[19rem] gap-y-[0.875rem] p-[0.875rem]'
      required={required}
      type={SELECT_TYPE.SEARCH_SELECT}
      useReset={useReset}
      value={value}
      onSelect={onSelect}
    >
      <InputSearch
        {...restInputOption}
        label='검색'
        placeholder={inputPlaceholder}
        value={searchValue}
        hiddenLabel
      />
      <SingleSelectBaseList>
        {hasChildren ? children : <SelectBaseListEmpty />}
      </SingleSelectBaseList>
    </SingleSelectBase>
  );
};

export default SearchSelect;

SearchSelect.displayName = 'SearchSelect';
SearchSelect.Item = SearchSelectItem;
