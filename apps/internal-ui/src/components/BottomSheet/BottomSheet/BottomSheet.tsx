import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { BottomSheetProps } from '@/components/BottomSheet/BottomSheet/types';
import { MODAL_VARIANTS, ModalBase } from '@/components/Modal';

const BottomSheet = ({
  ref,
  isOpen,
  children,
  className,
}: PropsWithChildren<BottomSheetProps>) => {
  return (
    <ModalBase
      ref={ref}
      variant={MODAL_VARIANTS.BOTTOM_SHEET}
      isOpen={isOpen}
      dimmed
    >
      <div
        className={clsx(
          className,
          'flex-v-stack rounded-16 shadow-24 gap-y-6 bg-white px-[1.875rem] pb-6',
        )}
      >
        {children}
      </div>
    </ModalBase>
  );
};

export default BottomSheet;
