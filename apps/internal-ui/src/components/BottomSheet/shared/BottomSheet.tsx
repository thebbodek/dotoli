import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import BottomSheetContentContainer from '@/components/BottomSheet/shared/BottomSheetContentContainer';
import BottomSheetFooter from '@/components/BottomSheet/shared/BottomSheetFooter';
import { BottomSheetProps } from '@/components/BottomSheet/shared/types';
import Overlay from '@/components/shared/components/Overlay/Overlay';
import { OVERLAY_VARIANTS } from '@/components/shared/components/Overlay/constants';

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
BottomSheet.ContentContainer = BottomSheetContentContainer;
BottomSheet.Footer = BottomSheetFooter;
