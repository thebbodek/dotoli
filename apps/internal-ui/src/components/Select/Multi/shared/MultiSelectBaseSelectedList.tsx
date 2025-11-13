import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';
import { MultiSelectBaseSelectedListProps } from '@/components/Select/Multi/shared/types';

const MultiSelectBaseSelectedList = ({
  className,
  children,
}: PropsWithChildren<MultiSelectBaseSelectedListProps>) => {
  const { selectedListResultId } = useMultiSelectBaseContext();

  return (
    <ul
      className={clsx(
        className,
        'in-flex-h-stack in-tablet:h-full in-tablet:in-flex-v-stack in-tablet:overflow-y-auto in-tablet:overflow-x-hidden gap-2 overflow-x-auto overflow-y-hidden',
      )}
      aria-describedby={selectedListResultId}
      aria-label='선택된 목록'
    >
      {children}
    </ul>
  );
};

export default MultiSelectBaseSelectedList;
