import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { SelectBaseItemProps } from '@/components/Select/shared/types';

const SelectBaseItem = ({
  selected,
  children,
  onClick,
}: PropsWithChildren<SelectBaseItemProps>) => {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    onClick();
  };

  return (
    <li
      role='option'
      className={clsx(
        'text-body-16-r rounded-8 hover:bg-primary-01 h-[2.5rem] shrink-0 cursor-pointer overflow-hidden truncate px-4 py-2 text-black',
        selected && 'bg-primary-01',
      )}
      aria-selected={selected}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};

export default SelectBaseItem;
