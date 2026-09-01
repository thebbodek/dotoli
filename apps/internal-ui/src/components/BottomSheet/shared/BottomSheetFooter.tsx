import { BottomSheetFooterProps } from '@/components/BottomSheet/shared/types';
import { OverlayFooter } from '@/components/shared';

const BottomSheetFooter = ({
  confirmOption,
  cancelOption,
  isPending,
  isLoading,
  canConfirm,
}: BottomSheetFooterProps) => {
  return (
    <OverlayFooter
      canConfirm={canConfirm}
      cancelOption={cancelOption}
      className='px-5 pb-5'
      confirmOption={confirmOption}
      isLoading={isLoading}
      isPending={isPending}
      isFull
    />
  );
};

export default BottomSheetFooter;
