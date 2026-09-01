import { ModalFooterProps } from '@/components/Modal/shared/types';
import { OverlayFooter } from '@/components/shared';

const ModalFooter = ({
  confirmOption,
  cancelOption,
  isPending,
  isLoading,
  canConfirm,
}: ModalFooterProps) => {
  return (
    <OverlayFooter
      canConfirm={canConfirm}
      cancelOption={cancelOption}
      confirmOption={confirmOption}
      isLoading={isLoading}
      isPending={isPending}
      isFull
    />
  );
};

export default ModalFooter;
