import { PropsWithChildren } from 'react';

import { SearchSelectItemProps } from '@/components/Select/SearchSelect/types';
import SelectBaseItem from '@/components/Select/shared/SelectBaseItem';

const SearchSelectItem = ({
  children,
  onSelect,
  selected,
}: PropsWithChildren<SearchSelectItemProps>) => {
  return (
    <SelectBaseItem onSelect={onSelect} selected={selected}>
      {children}
    </SelectBaseItem>
  );
};

export default SearchSelectItem;
