import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { OverlayHeader, OverlayHeaderProps } from '@/components/shared';

const DialogHeader = ({
  children,
  className,
}: PropsWithChildren<Pick<OverlayHeaderProps, 'className'>>) => {
  return (
    <OverlayHeader className={clsx(className, 'px-[1.875rem] py-5')}>
      {children}
    </OverlayHeader>
  );
};

export default DialogHeader;
