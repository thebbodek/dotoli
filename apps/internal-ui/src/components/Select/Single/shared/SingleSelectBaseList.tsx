import { PropsWithChildren } from 'react';

import { useSingleSelectListContext } from '@/components/Select/Single/shared/context';

const SingleSelectBaseList = ({ children }: PropsWithChildren) => {
  const { id, labelId } = useSingleSelectListContext();

  return (
    <ul
      aria-labelledby={labelId}
      className='in-flex-v-stack flex-1 gap-y-0.5 overflow-y-auto'
      id={id}
      role='listbox'
    >
      {children}
    </ul>
  );
};

export default SingleSelectBaseList;
