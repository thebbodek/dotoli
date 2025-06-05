import clsx from 'clsx';
import { MouseEvent, PropsWithChildren } from 'react';

import { SelectBaseItemProps } from '@/components/Select/shared/types';

const SelectBaseItem = ({
  className,
  selected,
  children,
  onClick,
}: PropsWithChildren<SelectBaseItemProps>) => {
  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    onClick();
  };

  return (
    <li
      role='option'
      className={clsx(
        className,
        'rounded-8 hover:bg-primary-01 h-[2.5rem] cursor-pointer overflow-hidden text-black',
      )}
      aria-selected={selected}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};

export default SelectBaseItem;
