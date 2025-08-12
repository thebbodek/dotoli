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
      confirmOption={confirmOption}
      cancelOption={cancelOption}
      isPending={isPending}
      isLoading={isLoading}
      possibleConfirm={possibleConfirm}
      className='px-5 pb-5'
      isFull
    />
  );
};

export default BottomSheetFooter;
