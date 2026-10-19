import clsx from 'clsx';
import {
  ElementType,
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
} from 'react';

import { SelectBaseItemProps } from '@/components/Select/shared/types';

const SelectBaseItem = ({
  as,
  className,
  isSelected,
  children,
  onClick,
  label,
  ...props
}: PropsWithChildren<SelectBaseItemProps>) => {
  const Component: ElementType = as ?? 'li';

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();

    onClick();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;

    e.preventDefault();
    onClick();
  };

  return (
    <Component
      {...props}
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
    </Component>
  );
};

export default SelectBaseItem;
