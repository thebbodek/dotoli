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
  className,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} ref={ref} className={clsx(className, 'pt-10')}>
      <ConfirmOverlayContent
        title={title}
        iconOptions={iconOptions}
        useIcon={useIcon}
      />
      {children}
      <Modal.Footer
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmButtonLabel={confirmButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        possibleConfirm={possibleConfirm}
        isPending={isPending}
      />
    </Modal>
  );
};

export default ConfirmModal;

ConfirmModal.displayName = 'ConfirmModal';
ConfirmModal.Description = ConfirmOverlayDescription;
