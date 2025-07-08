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
}: PropsWithChildren<SearchSelectProps<T>>) => {
  const {
    placeholder: inputPlaceholder = '검색어를 입력해주세요',
    ...restInputOption
  } = inputOption ?? {};
  const hasChildren = Children.count(children) > 0;

  return (
    <SingleSelectBase
      type={SELECT_TYPE.SEARCH_SELECT}
      className={className}
      label={label}
      popoverOption={popoverOption}
      disabled={disabled}
      feedback={feedback}
      required={required}
      isError={isError}
      value={value}
      badge={badge}
      onSelect={onSelect}
      displayValue={displayValue}
      placeholder={placeholder}
      popoverWrapperClassName='in-flex-v-stack h-[19rem] gap-y-[0.875rem] p-[0.875rem]'
    >
      <InputSearch {...restInputOption} placeholder={inputPlaceholder} />
      <SingleSelectBaseList>
        {hasChildren ? children : <SelectBaseListEmpty />}
      </SingleSelectBaseList>
    </SingleSelectBase>
  );
};

export default SearchSelect;

SearchSelect.displayName = 'SearchSelect';
SearchSelect.Item = SearchSelectItem;
