import clsx from 'clsx';

import { InfoModalProps } from '@/components/Modal/InfoModal/types';
import { Modal } from '@/components/Modal/shared';
import { OverlayDescription, OverlayTitle } from '@/components/shared';

const InfoModal = ({
  ref,
  isOpen,
  title,
  children,
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel = '닫기',
  isLoading,
  className,
}: InfoModalProps) => {
  return (
    <Modal isOpen={isOpen} ref={ref} className={clsx(className, 'pt-5')}>
      <Modal.ContentWrapper isLoading={isLoading}>
        <header className='mb-5'>
          <OverlayTitle title={title} />
        </header>
        {children}
      </Modal.ContentWrapper>
      <Modal.Footer
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmButtonLabel={confirmButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        possibleConfirm
      />
    </Modal>
  );
};

export default InfoModal;

InfoModal.displayName = 'InfoModal';
InfoModal.Description = OverlayDescription;
