import { PropsWithChildren } from 'react';

import { SelectItemProps } from '@/components/Select/Select/types';
import SelectBaseItem from '@/components/Select/shared/SelectBaseItem';

const SelectItem = ({
  children,
  onSelect,
  selected,
}: PropsWithChildren<SelectItemProps>) => {
  return (
    <SelectBaseItem onSelect={onSelect} selected={selected}>
      {children}
    </SelectBaseItem>
  );
};

export default SelectItem;
