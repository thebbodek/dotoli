import { FormDialogProps } from '@/components/Dialog/FormDialog/types';
import Dialog from '@/components/Dialog/shared/Dialog';
import {
  OVERLAY_CONTENT_WRAPPER_ELEMENTS,
  OverlayTitle,
} from '@/components/shared';

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
  isLoading,
}: FormDialogProps) => {
  return (
    <Dialog isOpen={isOpen} ref={ref} className={className}>
      <Dialog.Header>
        <OverlayTitle title={title} />
      </Dialog.Header>
      <Dialog.ContentWrapper
        as={OVERLAY_CONTENT_WRAPPER_ELEMENTS.FORM}
        isLoading={isLoading}
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
        isLoading={isLoading}
      />
    </Dialog>
  );
};

export default FormDialog;
