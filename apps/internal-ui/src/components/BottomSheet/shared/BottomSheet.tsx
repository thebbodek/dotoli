import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import BottomSheetContentWrapper from '@/components/BottomSheet/shared/BottomSheetContentWrapper';
import BottomSheetFooter from '@/components/BottomSheet/shared/BottomSheetFooter';
import { BottomSheetProps } from '@/components/BottomSheet/shared/types';
import { OVERLAY_VARIANTS } from '@/components/shared/components/Overlay/constants';
import Overlay from '@/components/shared/components/Overlay/Overlay';

const BottomSheet = ({
  ref,
  isOpen,
  children,
  className,
}: PropsWithChildren<BottomSheetProps>) => {
  return (
    <Overlay
      ref={ref}
      variant={OVERLAY_VARIANTS.BOTTOM_SHEET}
      isOpen={isOpen}
      dimmed
    >
      <div
        className={clsx(
          className,
          'animate-bottom-sheet safe-area-bottom shadow-30 rounded-t-24 bg-white',
        )}
      >
        {children}
      </div>
    </Overlay>
  );
};

export default BottomSheet;

BottomSheet.displayName = 'BottomSheet';
BottomSheet.ContentWrapper = BottomSheetContentWrapper;
BottomSheet.Footer = BottomSheetFooter;
