import { PropsWithChildren } from 'react';

const MultiSelectOptionLabel = ({ children }: PropsWithChildren) => {
  return <span className='text-body-14-r'>{children}</span>;
};

export default MultiSelectOptionLabel;
