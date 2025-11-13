import { PropsWithChildren, useId } from 'react';

import { SELECT_TYPE, SelectBase } from '@/components/Select/shared';
import { SingleSelectListProvider } from '@/components/Select/Single/shared';
import SingleSelectBaseList from '@/components/Select/Single/shared/SingleSelectBaseList';
import SortItem from '@/components/Sort/SortItem';
import SortTrigger from '@/components/Sort/SortTrigger';
import { SortProps } from '@/components/Sort/types';

const Sort = ({
  value,
  displayValue,
  label,
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
      className={className}
      controls={selectListId}
      disabled={disabled}
      label={<SelectBase.Label label={label} hidden />}
      labelId={labelId}
      popoverOption={popoverOption}
      trigger={<SortTrigger displayValue={displayValue} />}
      type={SELECT_TYPE.SELECT}
    >
      {({ close }) => (
        <SingleSelectListProvider
          close={close}
          id={selectListId}
          labelId={labelId}
          value={value}
          onSelect={onSelect}
        >
          <SelectBase.PopoverWrapper className='p-1'>
            <SingleSelectBaseList>{children}</SingleSelectBaseList>
          </SelectBase.PopoverWrapper>
        </SingleSelectListProvider>
      )}
    </SelectBase>
  );
};

export default Sort;

Sort.displayName = 'Sort';
Sort.Item = SortItem;
