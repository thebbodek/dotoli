import { PropsWithChildren } from 'react';

const DialogHeader = ({ children }: PropsWithChildren) => {
  return (
    <header className='border-b-gray-02 border-b px-[1.875rem] py-5'>
      {children}
    </header>
  );
};

export default DialogHeader;
