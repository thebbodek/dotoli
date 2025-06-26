import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { FullScreenDialogContentWrapperProps } from '@/components/FullScreenDialog/shared/types';
import { OverlayContentWrapper } from '@/components/shared';

const FullScreenDialogContentWrapper = ({
  as,
  isLoading,
  children,
  className,
}: PropsWithChildren<FullScreenDialogContentWrapperProps>) => {
  return (
    <OverlayContentWrapper
      as={as}
      isLoading={isLoading}
      className={clsx(className, 'flex-1 overflow-y-auto px-5 py-10')}
    >
      {children}
    </OverlayContentWrapper>
  );
};

export default FullScreenDialogContentWrapper;
