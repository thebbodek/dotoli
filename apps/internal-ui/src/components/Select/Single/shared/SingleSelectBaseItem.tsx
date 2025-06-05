import { PropsWithChildren } from 'react';

import SelectBaseItem from '@/components/Select/shared/SelectBaseItem';
import { useSingleSelectListContext } from '@/components/Select/Single/shared/context';
import {
  SelectValue,
  SingleSelectBaseItemProps,
} from '@/components/Select/Single/shared/types';

const SingleSelectBaseItem = <T extends SelectValue>({
  value,
  children,
}: PropsWithChildren<SingleSelectBaseItemProps<T>>) => {
  const { value: currentValue, onSelect, close } = useSingleSelectListContext();
  const selected = value === currentValue;

  const onClick = () => {
    onSelect({ value });
    close();
  };

  return (
    <SelectBaseItem onClick={onClick} selected={selected}>
      {children}
    </SelectBaseItem>
  );
};

export default SingleSelectBaseItem;
