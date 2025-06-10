import clsx from 'clsx';
import { MouseEvent } from 'react';

import {
  Button,
  BUTTON_ICON_POSITIONS,
  BUTTON_SIZES,
  ButtonProps,
} from '@/components/Button';
import { OverlayFooterProps } from '@/components/shared/components/Overlay/types';

const OverlayFooter = ({
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  possibleConfirm = false,
  isPending = false,
  isFull = false,
  buttonSize = BUTTON_SIZES.MD,
  className,
}: OverlayFooterProps) => {
  const buttonDefaultProps: Omit<ButtonProps, 'label'> = {
    size: buttonSize,
    className: clsx(isFull && 'flex-1'),
  };

  const handleConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (possibleConfirm && !isPending) {
      onConfirm();
    }
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
          onClick={() => !isPending && onCancel?.()}
          disabled={isPending}
        />
      )}
      <Button
        {...buttonDefaultProps}
        label={confirmButtonLabel}
        onClick={handleConfirm}
        disabled={!possibleConfirm}
        isPending={isPending}
        iconPosition={isPending ? BUTTON_ICON_POSITIONS.LEFT : undefined}
      />
    </footer>
  );
};

export default OverlayFooter;
