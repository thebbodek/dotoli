import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { BottomSheetContentContainerProps } from '@/components/BottomSheet/shared/types';

const BottomSheetContentContainer = ({
  children,
  className,
}: PropsWithChildren<BottomSheetContentContainerProps>) => {
  return (
    <div className={clsx('px-5 pb-6 pt-[1.875rem]', className)}>{children}</div>
  );
};

export default BottomSheetContentContainer;
