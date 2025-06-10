import { BottomSheetFooterProps } from '@/components/BottomSheet/shared/types';
import { OverlayFooter } from '@/components/shared';

const BottomSheetFooter = ({
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  isPending,
  possibleConfirm,
}: BottomSheetFooterProps) => {
  return (
    <OverlayFooter
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmButtonLabel={confirmButtonLabel}
      cancelButtonLabel={cancelButtonLabel}
      isPending={isPending}
      possibleConfirm={possibleConfirm}
      className='px-5 pb-5 pt-3'
      isFull
    />
  );
};

export default BottomSheetFooter;
