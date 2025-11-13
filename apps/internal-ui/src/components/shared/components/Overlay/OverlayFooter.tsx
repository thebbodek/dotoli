import clsx from 'clsx';
import { MouseEvent } from 'react';

import {
  Button,
  BUTTON_ICON_POSITIONS,
  BUTTON_SIZES,
  ButtonProps,
} from '@/components/Button';
import { OVERLAY_CONFIRM_TOOLTIP_GAP } from '@/components/shared/components/Overlay/constants';
import { OverlayFooterProps } from '@/components/shared/components/Overlay/types';
import { Tooltip } from '@/components/Tooltip';

const OverlayFooter = ({
  confirmOption,
  cancelOption,
  possibleConfirm = false,
  isPending = false,
  isLoading = false,
  isFull = false,
  buttonSize = BUTTON_SIZES.MD,
  className,
}: OverlayFooterProps) => {
  const { label: confirmLabel, onConfirm, tooltipOption } = confirmOption;
  const {
    useTooltip = !possibleConfirm,
    content = '필수 항목을 모두 입력해주세요',
  } = tooltipOption ?? {};
  const { label: cancelLabel, onCancel } = cancelOption ?? {};

  const buttonDefaultProps: Omit<ButtonProps, 'label'> = {
    size: buttonSize,
  };
  const buttonClassName = clsx(
    isFull && 'flex-1',
    isFull && onCancel && 'max-w-[calc(50%-4px)]',
  );

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
        'in-flex-h-stack items-center gap-x-2',
        !isFull && 'justify-end',
      )}
    >
      {onCancel && (
        <Button
          {...buttonDefaultProps}
          className={buttonClassName}
          disabled={isPending}
          label={cancelLabel || '취소'}
          theme='gray'
          variant='outlined'
          onClick={() => !isPending && onCancel?.()}
        />
      )}
      <Tooltip
        content={content}
        gap={OVERLAY_CONFIRM_TOOLTIP_GAP}
        hidden={!useTooltip}
        rootClassName={buttonClassName}
      >
        <Button
          {...buttonDefaultProps}
          className='w-full'
          disabled={!possibleConfirm || isPending || isLoading}
          iconPosition={BUTTON_ICON_POSITIONS.RIGHT}
          isPending={isPending}
          label={confirmLabel}
          onClick={handleConfirm}
        />
      </Tooltip>
    </footer>
  );
};

export default OverlayFooter;
