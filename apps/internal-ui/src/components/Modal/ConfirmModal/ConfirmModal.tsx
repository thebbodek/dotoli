import clsx from 'clsx';

import { Icon } from '@/components/Icon';
import { ConfirmModalProps } from '@/components/Modal/ConfirmModal/types';
import { Modal } from '@/components/Modal/shared';
import { COLOR_STYLES_MAPPER, COLOR_VARIANTS } from '@/variants';

const ConfirmModal = ({
  ref,
  isOpen,
  title,
  description,
  iconOptions = {},
  useIcon = false,
  confirmButtonLabel,
  cancelButtonLabel,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const confirmDefaultLabel = onCancel ? '네' : '확인';
  const {
    color = COLOR_VARIANTS.PRIMARY_04,
    backgroundColor = COLOR_VARIANTS.PRIMARY_01,
    iconKey = 'exclamation-mark',
  } = iconOptions;

  return (
    <Modal isOpen={isOpen} ref={ref} className='flex-v-stack gap-y-6 pt-10'>
      <div className='flex-v-stack items-center gap-y-2'>
        {useIcon && (
          <Icon
            iconKey={iconKey}
            className={clsx(
              COLOR_STYLES_MAPPER.TEXT[color],
              COLOR_STYLES_MAPPER.BACKGROUND[backgroundColor],
              'mb-1 h-[3.25rem] w-[3.25rem] rounded-full text-[2.125rem]',
            )}
          />
        )}
        <Modal.Title title={title} className='text-center' />
        <Modal.Description description={description} className='text-center' />
      </div>
      <Modal.Footer
        onConfirm={onConfirm}
        onCancel={onCancel}
        confirmButtonLabel={confirmButtonLabel || confirmDefaultLabel}
        cancelButtonLabel={cancelButtonLabel || '아니요'}
        className='gap-x-2.5'
      />
    </Modal>
  );
};

export default ConfirmModal;
