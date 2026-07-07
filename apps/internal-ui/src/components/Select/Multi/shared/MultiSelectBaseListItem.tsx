import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import MultiSelectBaseCheckIcon from '@/components/Select/Multi/shared/MultiSelectBaseCheckIcon';
import {
  MultiSelectBaseListItemProps,
  MultiSelectBaseValue,
} from '@/components/Select/Multi/shared/types';
import SelectBaseItem from '@/components/Select/shared/SelectBaseItem';

const MultiSelectBaseListItem = <T extends MultiSelectBaseValue>({
  children,
  optionKey,
  label,
  className,
  isSelected,
}: PropsWithChildren<MultiSelectBaseListItemProps<T>>) => {
  const { onSelect, onRemove } = useMultiSelectBaseContext();

  const onClick = () =>
    !isSelected ? onSelect({ key: optionKey }) : onRemove({ key: optionKey });

  return (
    <SelectBaseItem
      className={clsx(
        className,
        'hover:bg-in-primary-02 focus:bg-in-primary-02/90 flex items-center justify-between focus:outline-none',
        isSelected && 'bg-in-primary-02',
      )}
      isSelected={isSelected}
      label={label}
      onClick={onClick}
    >
      {children}
      <MultiSelectBaseCheckIcon isSelected={isSelected} />
    </SelectBaseItem>
  );
};

export default MultiSelectBaseListItem;
