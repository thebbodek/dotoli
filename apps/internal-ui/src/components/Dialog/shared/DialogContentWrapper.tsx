import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { DialogContentWrapperProps } from '@/components/Dialog/shared/types';
import { OverlayContentWrapper, OverlayLoading } from '@/components/shared';

const DialogContentWrapper = ({
  as,
  isLoading,
  children,
  className,
}: PropsWithChildren<DialogContentWrapperProps>) => {
  return (
    <div className='in-flex-v-stack relative min-h-0 flex-1'>
      <OverlayContentWrapper
        className={clsx(
          className,
          'flex-1 overflow-y-auto px-[1.875rem] py-[1.625rem]',
        )}
        as={as}
      >
        {children}
      </OverlayContentWrapper>
      {isLoading && <OverlayLoading />}
    </div>
  );
};

export default DialogContentWrapper;
