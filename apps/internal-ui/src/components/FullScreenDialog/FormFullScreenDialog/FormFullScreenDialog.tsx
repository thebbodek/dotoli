import FormFullScreenDialogFooter from '@/components/FullScreenDialog/FormFullScreenDialog/FormFullScreenDialogFooter';
import { FormFullScreenDialogProps } from '@/components/FullScreenDialog/FormFullScreenDialog/types';
import {
  FullScreenDialog,
  OVERLAY_CONTENT_WRAPPER_ELEMENTS,
} from '@/components/shared';

const FormFullScreenDialog = ({
  children,
  isOpen,
  ref,
  title,
  className,
  confirmOption,
  cancelOption,
  canConfirm,
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
        isLoading={isLoading || isPending}
        hasPadding
      >
        {children}
      </FullScreenDialog.ContentWrapper>
      <FormFullScreenDialogFooter
        canConfirm={canConfirm}
        cancelOption={cancelOption}
        confirmOption={confirmOption}
        isLoading={isLoading}
        isPending={isPending}
      />
    </FullScreenDialog>
  );
};

export default FormFullScreenDialog;
