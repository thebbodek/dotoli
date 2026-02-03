import { BUTTON_SIZES, IconButton } from '@/components/Button';
import { Dialog } from '@/components/Dialog/shared';
import { DIALOG_FOOTER_DEFAULT_STYLES } from '@/components/Dialog/shared/constants';
import useStepDialogConfirmModal from '@/components/Dialog/StepDialog/StepDialogConfirmModal/hooks/useStepDialogConfirmModal';
import {
  OVERLAY_CONTENT_WRAPPER_ELEMENTS,
  OverlayHeader,
  OverlayTitle,
  StepDialogFooter,
  StepDialogProps,
} from '@/components/shared';

const StepDialog = <T extends string>({
  step,
  steps,
  titles,
  isOpen,
  ref,
  className,
  isPending,
  isLoading,
  previousOptions,
  confirmOptions,
  onCancel,
  children,
  goToStep,
}: StepDialogProps<T>) => {
  const { onStepDialogConfirmModal } = useStepDialogConfirmModal();

  const handleCancel = async () => {
    const isConfirmed = await onStepDialogConfirmModal();

    isConfirmed && onCancel();
  };

  return (
    <Dialog isOpen={isOpen} ref={ref}>
      <OverlayHeader className='flex items-center justify-between py-5 pr-[1.375rem] pl-[1.875rem]'>
        <OverlayTitle title={step ? titles[step] : ''} />
        <IconButton
          aria-label='닫기'
          disabled={isPending}
          iconKey='x'
          theme='hover-gray'
          onClick={handleCancel}
        />
      </OverlayHeader>
      <Dialog.ContentWrapper
        as={OVERLAY_CONTENT_WRAPPER_ELEMENTS.FORM}
        className={className}
        isLoading={isLoading || isPending}
      >
        {children}
      </Dialog.ContentWrapper>
      <StepDialogFooter
        buttonOptions={{ size: BUTTON_SIZES.LG, className: 'px-10' }}
        className={DIALOG_FOOTER_DEFAULT_STYLES}
        confirmOptions={confirmOptions}
        goToStep={goToStep}
        isPending={isPending}
        previousOptions={previousOptions}
        step={step}
        steps={steps}
      />
    </Dialog>
  );
};

export default StepDialog;
