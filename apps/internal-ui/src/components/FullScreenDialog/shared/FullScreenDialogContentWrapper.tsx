import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { FullScreenDialogContentWrapperProps } from '@/components/FullScreenDialog/shared/types';
import { DialogOverlayContentWrapper } from '@/components/shared';

const FullScreenDialogContentWrapper = ({
  as,
  children,
  className,
}: PropsWithChildren<FullScreenDialogContentWrapperProps>) => {
  return (
    <DialogOverlayContentWrapper
      as={as}
      className={clsx(className, 'flex-1 overflow-y-auto px-5 py-10')}
    >
      {children}
    </DialogOverlayContentWrapper>
  );
};

export default FullScreenDialogContentWrapper;
