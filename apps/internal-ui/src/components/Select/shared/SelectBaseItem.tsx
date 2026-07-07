import clsx from 'clsx';
import { KeyboardEvent, MouseEvent, PropsWithChildren } from 'react';

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

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;

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
      tabIndex={-1}
      title={label}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </li>
  );
};

export default SelectBaseItem;
