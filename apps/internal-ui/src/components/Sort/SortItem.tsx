import { PropsWithChildren } from 'react';

import { SingleSelectBaseItem } from '@/components/Select/Single/shared';
import { SortItemProps, SortValue } from '@/components/Sort/types';

const SortItem = <T extends SortValue>({
  value,
  label,
  children,
}: PropsWithChildren<SortItemProps<T>>) => {
  return (
    <SingleSelectBaseItem value={value} label={label}>
      {children}
    </SingleSelectBaseItem>
  );
};

export default SortItem;
