import { PropsWithChildren, useId } from 'react';

import { SelectBase } from '@/components/Select/shared';
import SelectItem from '@/components/Select/Single/Select/SelectItem';
import { SingleSelectListProvider } from '@/components/Select/Single/shared';
import SingleSelectBaseList from '@/components/Select/Single/shared/SingleSelectBaseList';
import SortTrigger from '@/components/Sort/SortTrigger';
import { SortProps } from '@/components/Sort/types';

const Sort = ({
  value,
  displayValue,
  children,
  disabled = false,
  popoverOption,
  onSelect,
  className,
}: PropsWithChildren<SortProps>) => {
  const selectListId = useId();
  const labelId = useId();

  return (
    <SelectBase
      type={'select'}
      popoverOption={popoverOption}
      trigger={<SortTrigger displayValue={displayValue} />}
      disabled={disabled}
      controls={selectListId}
      labelId={labelId}
      className={className}
    >
      {({ close }) => (
        <SingleSelectListProvider
          id={selectListId}
          labelId={labelId}
          value={value}
          onSelect={onSelect}
          close={close}
        >
          <SelectBase.PopoverWrapper className={'p-1'}>
            <SingleSelectBaseList>{children}</SingleSelectBaseList>
          </SelectBase.PopoverWrapper>
        </SingleSelectListProvider>
      )}
    </SelectBase>
  );
};

export default Sort;

Sort.displayName = 'Sort';
Sort.Item = SelectItem;
