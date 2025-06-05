import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import SelectBaseItem from '@/components/Select/shared/SelectBaseItem';
import { useSingleSelectListContext } from '@/components/Select/Single/shared/context';
import {
  SelectValue,
  SingleSelectBaseItemProps,
} from '@/components/Select/Single/shared/types';

const SingleSelectBaseItem = <T extends SelectValue>({
  label,
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
    <SelectBaseItem
      className={clsx(
        'text-body-16-r hover:bg-primary-01 h-[2.5rem] truncate px-4 py-2 text-black',
        selected && 'bg-primary-01',
      )}
      onClick={onClick}
      selected={selected}
      label={label}
    >
      {children}
    </SelectBaseItem>
  );
};

export default SingleSelectBaseItem;
