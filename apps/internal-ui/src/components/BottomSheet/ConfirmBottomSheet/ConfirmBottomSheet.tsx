import { ConfirmBottomSheetProps } from '@/components/BottomSheet/ConfirmBottomSheet/types';
import BottomSheet from '@/components/BottomSheet/shared/BottomSheet';
import ConfirmOverlayContent from '@/components/shared/components/ConfirmOverlay/ConfirmOverlayContent';

const ConfirmBottomSheet = ({
  ref,
  isOpen,
  title,
  description,
  iconOptions,
  useIcon,
  confirmButtonLabel,
  cancelButtonLabel,
  onConfirm,
  onCancel,
}: ConfirmBottomSheetProps) => {
  return (
    <BottomSheet isOpen={isOpen} ref={ref}>
      <BottomSheet.ContentContainer className='flex-v-stack-center gap-y-2'>
        <ConfirmOverlayContent
          title={title}
          description={description}
          iconOptions={iconOptions}
          useIcon={useIcon}
        />
      </BottomSheet.ContentContainer>
      <BottomSheet.Footer
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmButtonLabel={confirmButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
      />
    </BottomSheet>
  );
};

export default ConfirmBottomSheet;
