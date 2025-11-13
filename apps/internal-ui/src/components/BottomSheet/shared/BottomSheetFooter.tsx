import { BottomSheetFooterProps } from '@/components/BottomSheet/shared/types';
import { OverlayFooter } from '@/components/shared';

const BottomSheetFooter = ({
  confirmOption,
  cancelOption,
  isPending,
  isLoading,
  possibleConfirm,
}: BottomSheetFooterProps) => {
  return (
    <OverlayFooter
      cancelOption={cancelOption}
      className='px-5 pb-5'
      confirmOption={confirmOption}
      isLoading={isLoading}
      isPending={isPending}
      possibleConfirm={possibleConfirm}
      isFull
    />
  );
};

export default BottomSheetFooter;
