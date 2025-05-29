import clsx from 'clsx';

import { Button } from '@/components/Button';
import { ModalButtonsProps } from '@/components/Modal/Modal/types';

const ModalButtons = ({
  onConfirm,
  onCancel,
  submitButtonLabel,
  cancelButtonLabel,
  className,
}: ModalButtonsProps) => {
  return (
    <div className={clsx(className, 'flex-h-stack')}>
      {onCancel && (
        <Button
          label={cancelButtonLabel}
          variant='outlined'
          size='md'
          theme='gray'
          className='flex-1'
          onClick={onCancel}
        />
      )}
      <Button
        label={submitButtonLabel}
        size='md'
        className='flex-1'
        onClick={onConfirm}
      />
    </div>
  );
};

export default ModalButtons;
