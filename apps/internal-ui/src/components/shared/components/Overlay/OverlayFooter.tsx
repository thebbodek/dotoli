import clsx from 'clsx';

import { Button, ButtonProps } from '@/components/Button';
import { OverlayFooterProps } from '@/components/shared/components/Overlay/types';

const OverlayFooter = ({
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  isFull = false,
  className,
}: OverlayFooterProps) => {
  const buttonDefaultProps: Omit<ButtonProps, 'label'> = {
    size: 'md',
    className: clsx(isFull && 'flex-1'),
  };

  return (
    <footer
      className={clsx(
        className,
        'flex-h-stack items-center gap-x-2',
        !isFull && 'justify-end',
      )}
    >
      {onCancel && (
        <Button
          {...buttonDefaultProps}
          label={cancelButtonLabel || '취소'}
          variant='outlined'
          theme='gray'
          onClick={onCancel}
        />
      )}
      <Button
        {...buttonDefaultProps}
        label={confirmButtonLabel}
        onClick={onConfirm}
      />
    </footer>
  );
};

export default OverlayFooter;
