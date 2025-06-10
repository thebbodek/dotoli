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
  const isSelected = value === currentValue;

  const onClick = () => {
    onSelect({ value });
    close();
  };

  return (
    <SelectBaseItem
      className={clsx(
        'text-in-body-16-r text-in-black hover:bg-in-primary-01 h-[2.5rem] truncate px-4 py-2',
        isSelected && 'bg-in-primary-01',
      )}
      onClick={onClick}
      isSelected={isSelected}
      label={label}
    >
      {children}
    </SelectBaseItem>
  );
};

export default SingleSelectBaseItem;
