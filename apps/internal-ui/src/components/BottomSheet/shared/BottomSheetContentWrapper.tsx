import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { BottomSheetContentWrapperProps } from '@/components/BottomSheet/shared/types';

const BottomSheetContentWrapper = ({
  children,
  className,
}: PropsWithChildren<BottomSheetContentWrapperProps>) => {
  return (
    <div className={clsx('px-5 pb-5 pt-[2.125rem]', className)}>{children}</div>
  );
};

export default BottomSheetContentWrapper;
