import { BUTTON_SIZES } from '@/components/Button';
import { DialogFooterProps } from '@/components/Dialog/shared/types';
import OverlayFooter from '@/components/shared/components/Overlay/OverlayFooter';

const DialogFooter = ({
  confirmOption,
  cancelOption,
  isPending,
  isLoading,
  possibleConfirm,
}: DialogFooterProps) => {
  return (
    <OverlayFooter
      buttonSize={BUTTON_SIZES.LG}
      cancelOption={cancelOption}
      className='border-in-gray-02 border-t px-[1.875rem] py-[1.125rem]'
      confirmOption={confirmOption}
      isLoading={isLoading}
      isPending={isPending}
      possibleConfirm={possibleConfirm}
    />
  );
};

export default DialogFooter;
