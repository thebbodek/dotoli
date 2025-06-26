import { PropsWithChildren } from 'react';

import { OverlayHeader } from '@/components/shared';

const DialogHeader = ({ children }: PropsWithChildren) => {
  return (
    <OverlayHeader className='px-[1.875rem] py-5'>{children}</OverlayHeader>
  );
};

export default DialogHeader;
