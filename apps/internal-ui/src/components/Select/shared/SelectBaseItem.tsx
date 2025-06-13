import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { useSelectListContext } from '@/components/Select/shared/context/SelectListContext';
import { SelectBaseItemProps } from '@/components/Select/shared/types';

const SelectBaseItem = ({
  onSelect,
  children,
  selected = false,
}: PropsWithChildren<SelectBaseItemProps>) => {
  const { onPopoverClose } = useSelectListContext();

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    onSelect();
    onPopoverClose();
  };

  return (
    <li
      role='option'
      className={clsx(
        'text-body-16-r rounded-8 hover:bg-primary-01 h-[2.5rem] shrink-0 cursor-pointer overflow-hidden truncate px-4 py-2 text-black',
        selected && 'bg-primary-01',
      )}
      aria-selected={selected}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default SelectBaseItem;
