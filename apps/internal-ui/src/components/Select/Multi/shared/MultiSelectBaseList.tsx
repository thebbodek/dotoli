import { PropsWithChildren } from 'react';

import { useMultiSelectBaseContext } from '@/components/Select/Multi/shared/context/MultiSelectBaseContext';

const MultiSelectBaseList = ({ children }: PropsWithChildren) => {
  const { selectListResultId } = useMultiSelectBaseContext();

  return (
    <ul
      aria-label='선택 가능한 목록'
      aria-labelledby={selectListResultId}
      className='in-flex-v-stack h-full gap-y-1 overflow-y-auto'
      role='listbox'
      aria-multiselectable
    >
      {children}
    </ul>
  );
};

export default MultiSelectBaseList;
