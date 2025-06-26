import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { OverlayHeaderProps } from '@/components/shared/components/Overlay/types';

const OverlayHeader = ({
  children,
  className,
}: PropsWithChildren<OverlayHeaderProps>) => {
  return (
    <header className={clsx(className, 'border-b-gray-02 border-b')}>
      {children}
    </header>
  );
};

export default OverlayHeader;
