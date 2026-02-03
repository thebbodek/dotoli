import { Button, ButtonProps } from '@/components/Button';
import { OverlayFooterProps } from '@/components/shared/components/Overlay/OverlayFooter/types';

const OverlayFooterCancelButton = ({
  size,
  isPending,
  isLoading,
  cancelOption,
  className,
}: Required<Pick<OverlayFooterProps, 'cancelOption'>> &
  Pick<OverlayFooterProps, 'isLoading' | 'isPending'> &
  Pick<ButtonProps, 'className' | 'size'>) => {
  const { label: cancelLabel, onCancel } = cancelOption;

  return (
    <Button
      className={className}
      disabled={isPending || isLoading}
      label={cancelLabel || '취소'}
      size={size}
      theme='gray'
      variant='outlined'
      onClick={onCancel}
    />
  );
};

export default OverlayFooterCancelButton;
