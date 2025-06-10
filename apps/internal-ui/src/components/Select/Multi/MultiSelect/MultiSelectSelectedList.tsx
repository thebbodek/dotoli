import { PropsWithChildren } from 'react';

import { useMultiSelectContext } from '@/components/Select/Multi/MultiSelect/context/MultiSelectContext';

const MultiSelectSelectedList = ({ children }: PropsWithChildren) => {
  const { selectedListResultId } = useMultiSelectContext();

  return (
    <ul
      aria-label='선택된 목록'
      className='flex-h-stack md:flex-v-stack h-full gap-2 overflow-x-auto md:overflow-y-auto'
      aria-describedby={selectedListResultId}
    >
      {children}
    </ul>
  );
};

export default MultiSelectSelectedList;
