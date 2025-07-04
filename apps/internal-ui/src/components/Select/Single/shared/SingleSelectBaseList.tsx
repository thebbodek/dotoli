import { PropsWithChildren } from 'react';

import { useSingleSelectListContext } from '@/components/Select/Single/shared/context';

const SingleSelectBaseList = ({ children }: PropsWithChildren) => {
  const { id, labelId } = useSingleSelectListContext();

  return (
    <ul
      id={id}
      role='listbox'
      className='in-flex-v-stack h-full gap-y-0.5 overflow-y-auto'
      aria-labelledby={labelId}
    >
      {children}
    </ul>
  );
};

export default SingleSelectBaseList;
