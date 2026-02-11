import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import {
  FullScreenDialogContentWrapperProps,
  OverlayContentWrapper,
} from '@/components/shared';

const FullScreenDialogContentWrapper = ({
  as,
  hasPadding = false,
  isLoading,
  children,
  className,
}: PropsWithChildren<FullScreenDialogContentWrapperProps>) => {
  return (
    <OverlayContentWrapper
      className={clsx(
        className,
        'flex-1 shrink grow overflow-y-auto',
        hasPadding && 'px-5 py-10',
      )}
      as={as}
      isLoading={isLoading}
    >
      {children}
    </OverlayContentWrapper>
  );
};

export default FullScreenDialogContentWrapper;
