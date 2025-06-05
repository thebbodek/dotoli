import { ConfirmOverlayFooterProps } from '@/components/shared/components/ConfirmOverlay/types';
import OverlayFooter from '@/components/shared/components/Overlay/OverlayFooter';

const ConfirmOverlayFooter = ({
  onConfirm,
  onCancel,
  confirmButtonLabel,
  cancelButtonLabel,
  className,
}: ConfirmOverlayFooterProps) => {
  const confirmDefaultLabel = onCancel ? '네' : '확인';

  return (
    <OverlayFooter
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmButtonLabel={confirmButtonLabel || confirmDefaultLabel}
      cancelButtonLabel={cancelButtonLabel || '아니요'}
      className={className}
      isFull
    />
  );
};

export default ConfirmOverlayFooter;
