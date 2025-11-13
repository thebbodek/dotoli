import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { BottomSheetContentWrapperProps } from '@/components/BottomSheet/shared/types';
import { OverlayContentWrapper } from '@/components/shared';

const BottomSheetContentWrapper = ({
  isLoading,
  children,
  className,
}: PropsWithChildren<BottomSheetContentWrapperProps>) => {
  return (
    <div className={clsx('px-5 pb-5 pt-[2.125rem]')}>
      <OverlayContentWrapper className={className} isLoading={isLoading}>
        {children}
      </OverlayContentWrapper>
    </div>
  );
};

export default BottomSheetContentWrapper;
