import { ModalFooterProps } from '@/components/Modal/shared/types';
import { OverlayFooter } from '@/components/shared';

const ModalFooter = ({
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  isPending,
  possibleConfirm,
}: ModalFooterProps) => {
  return (
    <OverlayFooter
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmButtonLabel={confirmButtonLabel}
      cancelButtonLabel={cancelButtonLabel}
      isPending={isPending}
      possibleConfirm={possibleConfirm}
      className='mt-6'
      isFull
    />
  );
};

export default ModalFooter;
