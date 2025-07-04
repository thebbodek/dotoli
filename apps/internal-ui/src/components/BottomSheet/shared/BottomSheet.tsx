import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import BottomSheetContentWrapper from '@/components/BottomSheet/shared/BottomSheetContentWrapper';
import BottomSheetFooter from '@/components/BottomSheet/shared/BottomSheetFooter';
import { BottomSheetProps } from '@/components/BottomSheet/shared/types';
import { Overlay, OVERLAY_VARIANTS } from '@/components/shared';

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
          'animate-in-bottom-sheet in-safe-area-bottom shadow-in-30 rounded-t-in-24 bg-in-white',
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
