import { Icon } from '@/components/Icon';
import { ConfirmModalProps } from '@/components/Modal/ConfirmModal/types';
import { Modal } from '@/components/Modal/Modal';

const ConfirmModal = ({
  ref,
  isOpen,
  title,
  description,
  useIcon = false,
  submitButtonLabel,
  cancelButtonLabel = '아니요',
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const submitDefaultLabel = onCancel ? '네' : '확인';

  return (
    <Modal isOpen={isOpen} ref={ref} className='pt-10'>
      <div className='flex-v-stack items-center gap-y-2'>
        {useIcon && (
          <Icon
            iconKey='exclamation-mark'
            className='bg-primary-01 text-primary-04 mb-1 h-[3.25rem] w-[3.25rem] rounded-full text-[2.125rem]'
          />
        )}
        <Modal.Title title={title} className='text-center' />
        <Modal.Description description={description} className='text-center' />
      </div>
      <Modal.Buttons
        onConfirm={onConfirm}
        onCancel={onCancel}
        submitButtonLabel={submitButtonLabel ?? submitDefaultLabel}
        cancelButtonLabel={cancelButtonLabel}
        className='gap-x-2.5'
      />
    </Modal>
  );
};

export default ConfirmModal;
