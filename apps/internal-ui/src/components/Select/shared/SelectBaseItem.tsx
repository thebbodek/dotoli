import clsx from 'clsx';
import { MouseEvent, PropsWithChildren } from 'react';

import { SelectBaseItemProps } from '@/components/Select/shared/types';

const SelectBaseItem = ({
  className,
  selected,
  children,
  onClick,
  label,
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
        'rounded-in-8 hover:bg-in-primary-01 text-in-black shrink-0 cursor-pointer overflow-hidden',
      )}
      aria-selected={selected}
      title={label}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};

export default SelectBaseItem;
