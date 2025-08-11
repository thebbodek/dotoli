import { ModalFooterProps } from '@/components/Modal/shared/types';
import { OverlayFooter } from '@/components/shared';

const ModalFooter = ({
  confirmOption,
  cancelOption,
  isPending,
  isLoading,
  possibleConfirm,
}: ModalFooterProps) => {
  return (
    <OverlayFooter
      confirmOption={confirmOption}
      cancelOption={cancelOption}
      isPending={isPending}
      isLoading={isLoading}
      possibleConfirm={possibleConfirm}
      isFull
    />
  );
};

export default ModalFooter;
