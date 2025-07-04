import { FormFullScreenDialogProps } from '@/components/FullScreenDialog/FormFullScreenDialog/types';
import FullScreenDialog from '@/components/FullScreenDialog/shared/FullScreenDialog';
import {
  OVERLAY_CONTENT_WRAPPER_ELEMENTS,
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
  isLoading,
}: FormFullScreenDialogProps) => {
  return (
    <FullScreenDialog isOpen={isOpen} ref={ref} className={className}>
      <FullScreenDialog.Header
        title={title}
        onCancel={onCancel}
        isPending={isPending}
      />
      <FullScreenDialog.ContentWrapper
        as={OVERLAY_CONTENT_WRAPPER_ELEMENTS.FORM}
        isLoading={isLoading}
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
        isLoading={isLoading}
        className='border-t-in-gray-02 border-t px-5 py-3'
        isFull
      />
    </FullScreenDialog>
  );
};

export default FormFullScreenDialog;
