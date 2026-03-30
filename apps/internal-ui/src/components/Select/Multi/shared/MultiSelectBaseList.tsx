import clsx from 'clsx';
import { HTMLAttributes, PropsWithChildren } from 'react';

import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';

const MultiSelectBaseList = ({
  className,
  children,
}: PropsWithChildren<
  PropsWithChildren<Pick<HTMLAttributes<HTMLUListElement>, 'className'>>
>) => {
  const { selectListResultId } = useMultiSelectBaseContext();

  return (
    <ul
      className={clsx(
        className,
        'in-flex-v-stack gap-y-1 overflow-y-auto overscroll-y-none',
      )}
      aria-label='선택 가능한 목록'
      aria-labelledby={selectListResultId}
      role='listbox'
      aria-multiselectable
    >
      {children}
    </ul>
  );
};

export default MultiSelectBaseList;
