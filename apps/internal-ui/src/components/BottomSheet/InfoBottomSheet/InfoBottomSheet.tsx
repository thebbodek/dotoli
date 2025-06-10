import { InfoBottomSheetProps } from '@/components/BottomSheet/InfoBottomSheet/types';
import BottomSheet from '@/components/BottomSheet/shared/BottomSheet';
import { OverlayDescription, OverlayTitle } from '@/components/shared';

const InfoBottomSheet = ({
  ref,
  isOpen,
  title,
  children,
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel = '닫기',
  className,
}: InfoBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} ref={ref} className={className}>
      <BottomSheet.ContentWrapper className='flex-v-stack gap-y-3'>
        <header>
          <OverlayTitle title={title} />
        </header>
        {children}
      </BottomSheet.ContentWrapper>
      <BottomSheet.Footer
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmButtonLabel={confirmButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
      />
    </BottomSheet>
  );
};

export default InfoBottomSheet;

InfoBottomSheet.displayName = 'InfoBottomSheet';
InfoBottomSheet.Description = OverlayDescription;
