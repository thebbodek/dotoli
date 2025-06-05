import { PropsWithChildren } from 'react';

import { InfoBottomSheetProps } from '@/components/BottomSheet/InfoBottomSheet/types';
import BottomSheet from '@/components/BottomSheet/shared/BottomSheet';
import OverlayDescription from '@/components/shared/components/Overlay/OverlayDescription';
import OverlayFooter from '@/components/shared/components/Overlay/OverlayFooter';
import OverlayTitle from '@/components/shared/components/Overlay/OverlayTitle';

const InfoBottomSheet = ({
  ref,
  isOpen,
  title,
  description,
  children,
  onConfirm,
  onCancel,
  confirmButtonLabel = '확인 완료',
  cancelButtonLabel,
}: PropsWithChildren<InfoBottomSheetProps>) => {
  return (
    <BottomSheet isOpen={isOpen} ref={ref}>
      <div className='gap-y-3'>
        <header>
          <OverlayTitle title={title} />
        </header>
        <div className='flex-v-stack gap-y-3'>
          {children}
          <OverlayDescription description={description} />
        </div>
      </div>
      <OverlayFooter
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmButtonLabel={confirmButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        isFull
      />
    </BottomSheet>
  );
};

export default InfoBottomSheet;
