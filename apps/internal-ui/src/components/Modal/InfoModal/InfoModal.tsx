import { PropsWithChildren } from 'react';

import { InfoModalProps } from '@/components/Modal/InfoModal/types';
import { Modal } from '@/components/Modal/shared';

const InfoModal = ({
  ref,
  isOpen,
  title,
  description,
  children,
  onConfirm,
  onCancel,
  confirmButtonLabel = '확인 완료',
  cancelButtonLabel,
}: PropsWithChildren<InfoModalProps>) => {
  return (
    <Modal isOpen={isOpen} ref={ref}>
      <header className='py-5'>
        <Modal.Title title={title} />
      </header>
      <div className='flex-v-stack mb-5 gap-y-5'>
        {children}
        <Modal.Description description={description} />
      </div>
      <Modal.Footer
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmButtonLabel={confirmButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        className='gap-x-2'
      />
    </Modal>
  );
};

export default InfoModal;
