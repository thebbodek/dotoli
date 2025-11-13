import clsx from 'clsx';
import { MouseEvent, PropsWithChildren } from 'react';

import { SelectBaseItemProps } from '@/components/Select/shared/types';

const SelectBaseItem = ({
  className,
  isSelected,
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
      className={clsx(
        className,
        'rounded-in-8 shrink-0 cursor-pointer overflow-hidden',
        !isSelected && 'bg-in-white',
      )}
      aria-selected={isSelected}
      role='option'
      title={label}
      onClick={handleClick}
    >
      {children}
    </li>
  );
};

export default SelectBaseItem;
