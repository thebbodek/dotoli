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
  className,
}: InfoModalProps) => {
  return (
    <Modal isOpen={isOpen} ref={ref} className={className}>
      <header className='py-5'>
        <OverlayTitle title={title} />
      </header>
      <div className='flex-v-stack gap-y-5'>{children}</div>
      <Modal.Footer
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmButtonLabel={confirmButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
      />
    </Modal>
  );
};

export default InfoModal;

InfoModal.displayName = 'InfoModal';
InfoModal.Description = OverlayDescription;
