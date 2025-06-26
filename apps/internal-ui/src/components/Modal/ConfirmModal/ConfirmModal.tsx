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
  iconOptions,
  useIcon = false,
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  possibleConfirm,
  isPending,
  isLoading,
  className,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} ref={ref} className={clsx(className, 'pt-10')}>
      <Modal.ContentWrapper isLoading={isLoading}>
        <ConfirmOverlayContent
          title={title}
          iconOptions={iconOptions}
          useIcon={useIcon}
        />
        {children}
      </Modal.ContentWrapper>
      <Modal.Footer
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmButtonLabel={confirmButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        possibleConfirm={possibleConfirm}
        isPending={isPending}
        isLoading={isLoading}
      />
    </Modal>
  );
};

export default ConfirmModal;

ConfirmModal.displayName = 'ConfirmModal';
ConfirmModal.Description = ConfirmOverlayDescription;
