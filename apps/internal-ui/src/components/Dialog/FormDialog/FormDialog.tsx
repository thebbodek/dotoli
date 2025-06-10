import { FormDialogProps } from '@/components/Dialog/FormDialog/types';
import Dialog from '@/components/Dialog/shared/Dialog';
import { DIALOG_OVERLAY_CONTENT_WRAPPER_ELEMENTS } from '@/components/shared';
import OverlayTitle from '@/components/shared/components/Overlay/OverlayTitle';

const FormDialog = ({
  children,
  isOpen,
  ref,
  title,
  className,
  onCancel,
  onConfirm,
  confirmButtonLabel,
  cancelButtonLabel,
  possibleConfirm,
  isPending,
}: FormDialogProps) => {
  return (
    <Dialog isOpen={isOpen} ref={ref} className={className}>
      <Dialog.Header>
        <OverlayTitle title={title} />
      </Dialog.Header>
      <Dialog.ContentWrapper
        as={DIALOG_OVERLAY_CONTENT_WRAPPER_ELEMENTS.FORM}
        className='gap-y-6'
      >
        {children}
      </Dialog.ContentWrapper>
      <Dialog.Footer
        onCancel={onCancel}
        onConfirm={onConfirm}
        confirmButtonLabel={confirmButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        possibleConfirm={possibleConfirm}
        isPending={isPending}
      />
    </Dialog>
  );
};

export default FormDialog;
