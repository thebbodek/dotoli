import clsx from 'clsx';

import { Button } from '@/components/Button';
import { ModalFooterProps } from '@/components/Modal/shared/types';

const ModalFooter = ({
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  className,
}: ModalFooterProps) => {
  return (
    <footer className={clsx(className, 'flex-h-stack')}>
      {onCancel && (
        <Button
          label={cancelButtonLabel || '닫기'}
          variant='outlined'
          size='md'
          theme='gray'
          className='flex-1'
          onClick={onCancel}
        />
      )}
      <Button
        label={confirmButtonLabel || '확인'}
        size='md'
        className='flex-1'
        onClick={onConfirm}
      />
    </footer>
  );
};

export default ModalFooter;
