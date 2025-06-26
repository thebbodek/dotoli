import { ModalFooterProps } from '@/components/Modal/shared/types';
import { OverlayFooter } from '@/components/shared';

const ModalFooter = ({
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  isPending,
  isLoading,
  possibleConfirm,
}: ModalFooterProps) => {
  return (
    <OverlayFooter
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmButtonLabel={confirmButtonLabel}
      cancelButtonLabel={cancelButtonLabel}
      isPending={isPending}
      isLoading={isLoading}
      possibleConfirm={possibleConfirm}
      isFull
    />
  );
};

export default ModalFooter;
