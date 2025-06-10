import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { InputSearch } from '@/components/Input';
import SearchSelectItem from '@/components/Select/SearchSelect/SearchSelectItem';
import { SearchSelectProps } from '@/components/Select/SearchSelect/types';
import { SelectBase } from '@/components/Select/shared';

const SearchSelect = ({
  label,
  value,
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
}: PropsWithChildren<SearchSelectProps>) => {
  const showPlaceholder = !value;
  const {
    placeholder: inputPlaceholder = '검색어를 입력해주세요',
    ...restInputOption
  } = inputOption ?? {};

  return (
    <SelectBase
      className={className}
      label={<SelectBase.Label badge={badge}>{label}</SelectBase.Label>}
      popoverOption={popoverOption}
      trigger={
        <SelectBase.Trigger>
          <button
            type='button'
            className={clsx(
              'text-body-16-r truncate text-black',
              (showPlaceholder || disabled) && 'text-gray-04',
            )}
            disabled={disabled}
          >
            {value || placeholder}
          </button>
        </SelectBase.Trigger>
      }
      disabled={disabled}
      feedback={feedback}
      required={required}
      isError={isError}
    >
      <SelectBase.PopoverWrapper className='flex-v-stack h-[19rem] gap-y-[0.875rem] p-[0.875rem]'>
        <InputSearch {...restInputOption} placeholder={inputPlaceholder} />
        <SelectBase.List>{children}</SelectBase.List>
      </SelectBase.PopoverWrapper>
    </SelectBase>
  );
};

export default SearchSelect;

SearchSelect.displayName = 'SearchSelect';
SearchSelect.Item = SearchSelectItem;
