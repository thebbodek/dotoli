import { PropsWithChildren } from 'react';

import { useSelectListContext } from '@/components/Select/shared/context/SelectListContext';

const SelectBaseList = ({ children }: PropsWithChildren) => {
  const { id, labelId } = useSelectListContext();

  return (
    <ul
      id={id}
      role='listbox'
      className='flex-v-stack h-full gap-y-0.5 overflow-y-auto'
      aria-labelledby={labelId}
    >
      {children}
    </ul>
  );
};

export default SelectBaseList;
