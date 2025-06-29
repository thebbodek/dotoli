import { PropsWithChildren } from 'react';

import { SearchSelectItemProps } from '@/components/Select/Single/SearchSelect/types';
import { SingleSelectBaseItem } from '@/components/Select/Single/shared';
import { SelectValue } from '@/components/Select/Single/shared/types';

const SearchSelectItem = <T extends SelectValue>({
  children,
  value,
}: PropsWithChildren<SearchSelectItemProps<T>>) => {
  return <SingleSelectBaseItem value={value}>{children}</SingleSelectBaseItem>;
};

export default SearchSelectItem;
