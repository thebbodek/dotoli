import { BUTTON_SIZES } from '@/components/Button';
import { DialogFooterProps } from '@/components/Dialog/shared/types';
import OverlayFooter from '@/components/shared/components/Overlay/OverlayFooter';

const DialogFooter = ({
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  isPending,
  isLoading,
  possibleConfirm,
}: DialogFooterProps) => {
  return (
    <OverlayFooter
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmButtonLabel={confirmButtonLabel}
      cancelButtonLabel={cancelButtonLabel}
      isPending={isPending}
      isLoading={isLoading}
      possibleConfirm={possibleConfirm}
      buttonSize={BUTTON_SIZES.LG}
      className='border-in-gray-02 border-t px-[1.875rem] py-[1.125rem]'
    />
  );
};

export default DialogFooter;
