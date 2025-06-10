import clsx from 'clsx';

import { BottomSheetFooterProps } from '@/components/BottomSheet/shared/types';
import { OverlayFooter } from '@/components/shared';

const BottomSheetFooter = ({ className, ...rest }: BottomSheetFooterProps) => {
  return (
    <OverlayFooter
      {...rest}
      className={clsx(className, 'px-5 pb-5 pt-3')}
      isFull
    />
  );
};

export default BottomSheetFooter;
