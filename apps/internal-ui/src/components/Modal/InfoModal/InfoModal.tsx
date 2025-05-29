import { PropsWithChildren } from 'react';

import { InfoModalProps } from '@/components/Modal/InfoModal/types';
import { Modal } from '@/components/Modal/Modal';

const InfoModal = ({
  ref,
  isOpen,
  title,
  description,
  children,
  onConfirm,
  onCancel,
  submitButtonLabel = '확인 완료',
}: PropsWithChildren<InfoModalProps>) => {
  return (
    <Modal isOpen={isOpen} ref={ref} className='pt-5'>
      <div className='flex-v-stack gap-y-5'>
        <Modal.Title title={title} className='px-1' />
        {children}
        <Modal.Description description={description} />
      </div>
      <Modal.Buttons
        onConfirm={onConfirm}
        onCancel={onCancel}
        submitButtonLabel={submitButtonLabel}
        cancelButtonLabel='닫기'
        className='gap-x-2'
      />
    </Modal>
  );
};

export default InfoModal;
