import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import {
  FullScreenDialogContentWrapperProps,
  OverlayContentWrapper,
  OverlayLoading,
} from '@/components/shared';

const FullScreenDialogContentWrapper = ({
  as,
  hasPadding = false,
  isLoading,
  children,
  className,
}: PropsWithChildren<FullScreenDialogContentWrapperProps>) => {
  return (
    <div className='in-flex-v-stack relative min-h-0 flex-1 shrink grow'>
      <OverlayContentWrapper
        className={clsx(
          className,
          'flex-1 shrink grow overflow-y-auto',
          hasPadding && 'px-5 py-10',
        )}
        as={as}
      >
        {children}
      </OverlayContentWrapper>
      {isLoading && <OverlayLoading />}
    </div>
  );
};

export default FullScreenDialogContentWrapper;
