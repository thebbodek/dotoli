import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { OverlayFooterWrapperProps } from '@/components/shared/components/Overlay/OverlayFooter/types';

const OverlayFooterWrapper = ({
  className,
  children,
}: PropsWithChildren<OverlayFooterWrapperProps>) => {
  return (
    <footer className={clsx(className, 'in-flex-h-stack items-center')}>
      {children}
    </footer>
  );
};

export default OverlayFooterWrapper;
