import { PropsWithChildren } from 'react';

const FileActionsWrapper = ({ children }: PropsWithChildren) => {
  return <div className='flex shrink-0 items-center gap-x-1'>{children}</div>;
};

export default FileActionsWrapper;
