import { FormFullScreenDialogProps } from '@/components/FullScreenDialog/FormFullScreenDialog/types';
import FullScreenDialog from '@/components/FullScreenDialog/shared/FullScreenDialog';
import {
  DIALOG_OVERLAY_CONTENT_WRAPPER_ELEMENTS,
  OverlayFooter,
} from '@/components/shared';

const FormFullScreenDialog = ({
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
}: FormFullScreenDialogProps) => {
  return (
    <FullScreenDialog isOpen={isOpen} ref={ref} className={className}>
      <FullScreenDialog.Header
        title={title}
        onCancel={onCancel}
        isPending={isPending}
      />
      <FullScreenDialog.ContentWrapper
        as={DIALOG_OVERLAY_CONTENT_WRAPPER_ELEMENTS.FORM}
        className='gap-y-8'
      >
        {children}
      </FullScreenDialog.ContentWrapper>
      <OverlayFooter
        onCancel={onCancel}
        onConfirm={onConfirm}
        confirmButtonLabel={confirmButtonLabel}
        cancelButtonLabel={cancelButtonLabel}
        possibleConfirm={possibleConfirm}
        isPending={isPending}
        className='border-t-gray-02 border-t px-5 py-3'
        isFull
      />
    </FullScreenDialog>
  );
};

export default FormFullScreenDialog;
