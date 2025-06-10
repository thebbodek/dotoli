import { BUTTON_SIZES } from '@/components/Button';
import { DialogFooterProps } from '@/components/Dialog/shared/types';
import OverlayFooter from '@/components/shared/components/Overlay/OverlayFooter';

const DialogFooter = ({
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  isPending,
  possibleConfirm,
}: DialogFooterProps) => {
  return (
    <OverlayFooter
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmButtonLabel={confirmButtonLabel}
      cancelButtonLabel={cancelButtonLabel}
      isPending={isPending}
      possibleConfirm={possibleConfirm}
      buttonSize={BUTTON_SIZES.LG}
      className='border-gray-02 border-t px-[1.875rem] py-[1.125rem]'
    />
  );
};

export default DialogFooter;
