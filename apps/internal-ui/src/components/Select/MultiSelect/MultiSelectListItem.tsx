import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { useMultiSelectContext } from '@/components/Select/MultiSelect/context/MultiSelectContext';
import {
  MultiSelectListItemProps,
  MultiSelectValue,
} from '@/components/Select/MultiSelect/types';

const MultiSelectListItem = <T extends MultiSelectValue>({
  children,
  value,
  heightClassName,
}: PropsWithChildren<MultiSelectListItemProps<T>>) => {
  const { onSelect, onRemove, selectedValues } = useMultiSelectContext();
  const selected = selectedValues.includes(value);

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    !selected ? onSelect({ value }) : onRemove({ value });
  };

  return (
    <li
      role='option'
      aria-selected={selected}
      className={clsx(
        heightClassName,
        'rounded-8 hover:bg-primary-02 hover:text-primary-06 flex shrink-0 items-center justify-between gap-x-2 overflow-hidden px-3 text-black hover:cursor-pointer',
        selected && 'bg-primary-02 text-primary-06',
      )}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default MultiSelectListItem;
