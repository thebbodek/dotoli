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
      cancelOption={cancelOption}
      confirmOption={confirmOption}
      isLoading={isLoading}
      isPending={isPending}
      possibleConfirm={possibleConfirm}
      isFull
    />
  );
};

export default ModalFooter;
