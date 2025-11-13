import { PropsWithChildren } from 'react';

import { SelectItemProps } from '@/components/Select/Single/Select/types';
import { SingleSelectBaseItem } from '@/components/Select/Single/shared';
import { SelectValue } from '@/components/Select/Single/shared/types';

const SelectItem = <T extends SelectValue>({
  children,
  value,
  label,
}: PropsWithChildren<SelectItemProps<T>>) => {
  return (
    <SingleSelectBaseItem label={label} value={value}>
      {children}
    </SingleSelectBaseItem>
  );
};

export default SelectItem;
