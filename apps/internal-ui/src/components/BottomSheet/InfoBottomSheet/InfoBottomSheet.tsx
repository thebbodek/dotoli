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
  isLoading,
  className,
}: InfoBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} ref={ref} className={className}>
      <BottomSheet.ContentWrapper
        isLoading={isLoading}
        className='flex-v-stack gap-y-3'
      >
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
        possibleConfirm
      />
    </BottomSheet>
  );
};

export default InfoBottomSheet;

InfoBottomSheet.displayName = 'InfoBottomSheet';
InfoBottomSheet.Description = OverlayDescription;
