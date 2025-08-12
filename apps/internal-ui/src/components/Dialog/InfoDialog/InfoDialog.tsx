import { InfoDialogProps } from '@/components/Dialog/InfoDialog/types';
import { Dialog } from '@/components/Dialog/shared';
import OverlayTitle from '@/components/shared/components/Overlay/OverlayTitle';

const InfoDialog = ({
  children,
  isOpen,
  ref,
  title,
  className,
  isLoading,
  confirmOption,
}: InfoDialogProps) => {
  const { label: confirmLabel = '닫기', onConfirm } = confirmOption;

  return (
    <Dialog isOpen={isOpen} ref={ref} className={className}>
      <Dialog.Header>
        <OverlayTitle title={title} />
      </Dialog.Header>
      <Dialog.ContentWrapper isLoading={isLoading}>
        {children}
      </Dialog.ContentWrapper>
      <Dialog.Footer
        confirmOption={{ label: confirmLabel, onConfirm }}
        possibleConfirm
      />
    </Dialog>
  );
};

export default InfoDialog;
