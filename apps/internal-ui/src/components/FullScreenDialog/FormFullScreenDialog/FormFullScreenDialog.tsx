import FormFullScreenDialogFooter from '@/components/FullScreenDialog/FormFullScreenDialog/FormFullScreenDialogFooter';
import { FormFullScreenDialogProps } from '@/components/FullScreenDialog/FormFullScreenDialog/types';
import FullScreenDialog from '@/components/FullScreenDialog/shared/FullScreenDialog';
import { OVERLAY_CONTENT_WRAPPER_ELEMENTS } from '@/components/shared';

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
        isLoading={isLoading || isPending}
      >
        {children}
      </FullScreenDialog.ContentWrapper>
      <FormFullScreenDialogFooter
        cancelOption={cancelOption}
        confirmOption={confirmOption}
        isLoading={isLoading}
        isPending={isPending}
        possibleConfirm={possibleConfirm}
      />
    </FullScreenDialog>
  );
};

export default FormFullScreenDialog;
