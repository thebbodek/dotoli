import clsx from 'clsx';

import { BUTTON_SIZES } from '@/components/Button';
import OverlayFooterCancelButton from '@/components/shared/components/Overlay/OverlayFooter/OverlayFooterCancelButton';
import OverlayFooterConfirmButton from '@/components/shared/components/Overlay/OverlayFooter/OverlayFooterConfirmButton';
import OverlayFooterWrapper from '@/components/shared/components/Overlay/OverlayFooter/OverlayFooterWrapper';
import { OverlayFooterProps } from '@/components/shared/components/Overlay/OverlayFooter/types';

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
  const { label: cancelLabel, onCancel } = cancelOption ?? {};
  const buttonClassName = clsx(
    isFull && 'flex-1',
    isFull && onCancel && 'max-w-[calc(50%-4px)]',
  );

  return (
    <OverlayFooterWrapper
      className={clsx(className, 'gap-x-2', !isFull && 'justify-end')}
    >
      {onCancel && (
        <OverlayFooterCancelButton
          cancelOption={{ label: cancelLabel, onCancel }}
          className={buttonClassName}
          isLoading={isLoading}
          isPending={isPending}
          size={buttonSize}
        />
      )}
      <OverlayFooterConfirmButton
        className={buttonClassName}
        confirmOption={confirmOption}
        isLoading={isLoading}
        isPending={isPending}
        possibleConfirm={possibleConfirm}
        size={buttonSize}
      />
    </OverlayFooterWrapper>
  );
};

export default OverlayFooter;
