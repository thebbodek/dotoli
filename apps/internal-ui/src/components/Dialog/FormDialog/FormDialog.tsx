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
  cancelOption,
  confirmOption,
  possibleConfirm,
  isPending,
  isLoading,
}: FormDialogProps) => {
  return (
    <Dialog className={className} isOpen={isOpen} ref={ref}>
      <Dialog.Header>
        <OverlayTitle title={title} />
      </Dialog.Header>
      <Dialog.ContentWrapper
        as={OVERLAY_CONTENT_WRAPPER_ELEMENTS.FORM}
        className='gap-y-6'
        isLoading={isLoading || isPending}
      >
        {children}
      </Dialog.ContentWrapper>
      <Dialog.Footer
        cancelOption={cancelOption}
        confirmOption={confirmOption}
        isLoading={isLoading}
        isPending={isPending}
        possibleConfirm={possibleConfirm}
      />
    </Dialog>
  );
};

export default FormDialog;
