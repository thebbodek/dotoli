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
  confirmOption,
  cancelOption,
  possibleConfirm,
  isPending,
  isLoading,
}: FormFullScreenDialogProps) => {
  const { onCancel } = cancelOption;

  return (
    <FullScreenDialog className={className} isOpen={isOpen} ref={ref}>
      <FullScreenDialog.Header
        isPending={isPending}
        title={title}
        onClose={onCancel}
      />
      <FullScreenDialog.ContentWrapper
        as={OVERLAY_CONTENT_WRAPPER_ELEMENTS.FORM}
        className='gap-y-8'
        isLoading={isLoading}
      >
        {children}
      </FullScreenDialog.ContentWrapper>
      <OverlayFooter
        cancelOption={cancelOption}
        className='border-t-in-gray-02 border-t px-5 py-3'
        confirmOption={confirmOption}
        isLoading={isLoading}
        isPending={isPending}
        possibleConfirm={possibleConfirm}
        isFull
      />
    </FullScreenDialog>
  );
};

export default FormFullScreenDialog;
