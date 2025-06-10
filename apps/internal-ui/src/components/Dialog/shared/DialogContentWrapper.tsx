import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { DialogContentWrapperProps } from '@/components/Dialog/shared/types';
import { DialogOverlayContentWrapper } from '@/components/shared/components/DialogOverlay';

const DialogContentWrapper = ({
  as,
  children,
  className,
}: PropsWithChildren<DialogContentWrapperProps>) => {
  return (
    <DialogOverlayContentWrapper
      as={as}
      className={clsx(className, 'px-[1.875rem] py-[1.625rem]')}
    >
      {children}
    </DialogOverlayContentWrapper>
  );
};

export default DialogContentWrapper;
