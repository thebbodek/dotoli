import { BottomSheetFooterProps } from '@/components/BottomSheet/shared/types';
import { OverlayFooter } from '@/components/shared';

const BottomSheetFooter = ({
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  isPending,
  isLoading,
  possibleConfirm,
}: BottomSheetFooterProps) => {
  return (
    <OverlayFooter
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmButtonLabel={confirmButtonLabel}
      cancelButtonLabel={cancelButtonLabel}
      isPending={isPending}
      isLoading={isLoading}
      possibleConfirm={possibleConfirm}
      className='px-5 pb-5'
      isFull
    />
  );
};

export default BottomSheetFooter;
