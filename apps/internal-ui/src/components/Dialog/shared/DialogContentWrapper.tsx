import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { DialogContentWrapperProps } from '@/components/Dialog/shared/types';
import { OverlayContentWrapper } from '@/components/shared';

const DialogContentWrapper = ({
  as,
  isLoading,
  children,
  className,
}: PropsWithChildren<DialogContentWrapperProps>) => {
  return (
    <OverlayContentWrapper
      as={as}
      isLoading={isLoading}
      className={clsx(
        className,
        'flex-1 overflow-y-auto px-[1.875rem] py-[1.625rem]',
      )}
    >
      {children}
    </OverlayContentWrapper>
  );
};

export default DialogContentWrapper;
