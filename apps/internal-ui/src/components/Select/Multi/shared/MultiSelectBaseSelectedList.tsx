import { PropsWithChildren } from 'react';

import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';

const MultiSelectBaseSelectedList = ({ children }: PropsWithChildren) => {
  const { selectedListResultId } = useMultiSelectBaseContext();

  return (
    <ul
      aria-label='선택된 목록'
      className='in-flex-h-stack in-tablet:h-full in-tablet:in-flex-v-stack in-tablet:overflow-y-auto in-tablet:overflow-x-hidden h-[1.5rem] gap-2 overflow-x-auto overflow-y-hidden'
      aria-describedby={selectedListResultId}
    >
      {children}
    </ul>
  );
};

export default MultiSelectBaseSelectedList;
