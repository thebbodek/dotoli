import clsx from 'clsx';

import { ConfirmModalProps } from '@/components/Modal/ConfirmModal/types';
import { Modal } from '@/components/Modal/shared';
import {
  ConfirmOverlayContent,
  ConfirmOverlayDescription,
} from '@/components/shared';

const ConfirmModal = ({
  ref,
  isOpen,
  title,
  children,
  iconOption,
  useIcon = false,
  confirmOption,
  cancelOption,
  possibleConfirm,
  isPending,
  isLoading,
  className,
}: ConfirmModalProps) => {
  return (
    <Modal className={clsx(className, 'pt-10')} isOpen={isOpen} ref={ref}>
      <Modal.ContentWrapper isLoading={isLoading}>
        <ConfirmOverlayContent
          iconOption={iconOption}
          title={title}
          useIcon={useIcon}
        />
        {children}
      </Modal.ContentWrapper>
      <Modal.Footer
        cancelOption={cancelOption}
        confirmOption={confirmOption}
        isLoading={isLoading}
        isPending={isPending}
        possibleConfirm={possibleConfirm}
      />
    </Modal>
  );
};

export default ConfirmModal;

ConfirmModal.displayName = 'ConfirmModal';
ConfirmModal.Description = ConfirmOverlayDescription;
