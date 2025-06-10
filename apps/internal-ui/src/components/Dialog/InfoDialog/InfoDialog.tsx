import { InfoDialogProps } from '@/components/Dialog/InfoDialog/types';
import { Dialog } from '@/components/Dialog/shared';
import OverlayTitle from '@/components/shared/components/Overlay/OverlayTitle';

const InfoDialog = ({
  children,
  isOpen,
  ref,
  title,
  className,
  onConfirm,
  confirmButtonLabel = '닫기',
}: InfoDialogProps) => {
  return (
    <Dialog isOpen={isOpen} ref={ref} className={className}>
      <Dialog.Header>
        <OverlayTitle title={title} />
      </Dialog.Header>
      <Dialog.ContentWrapper>{children}</Dialog.ContentWrapper>
      <Dialog.Footer
        onConfirm={onConfirm}
        confirmButtonLabel={confirmButtonLabel}
        possibleConfirm
      />
    </Dialog>
  );
};

export default InfoDialog;
