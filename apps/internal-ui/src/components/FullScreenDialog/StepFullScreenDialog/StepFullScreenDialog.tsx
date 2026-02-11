import { BUTTON_SIZES } from '@/components/Button';
import useStepFullScreenDialogConfirmBottomSheet from '@/components/FullScreenDialog/StepFullScreenDialog/StepFullScreenDialogConfirmBottomSheet/hooks/useStepFullScreenDialogConfirmBottomSheet';
import {
  FullScreenDialog,
  OVERLAY_CONTENT_WRAPPER_ELEMENTS,
  StepDialogFooter,
  StepDialogProps,
} from '@/components/shared';
import { FORM_FULL_SCREEN_DIALOG_FOOTER_DEFAULT_STYLES } from '@/components/shared/components/FullScreenDialog/constants';

const StepFullScreenDialog = <T extends string>({
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
  const { onStepFullScreenDialogConfirmBottomSheet } =
    useStepFullScreenDialogConfirmBottomSheet();

  const handleCancel = async () => {
    const isConfirmed = await onStepFullScreenDialogConfirmBottomSheet();

    isConfirmed && onCancel();
  };

  return (
    <FullScreenDialog isOpen={isOpen} ref={ref}>
      <FullScreenDialog.Header
        isPending={isPending}
        title={step ? titles[step] : ''}
        onClose={handleCancel}
      />
      <FullScreenDialog.ContentWrapper
        as={OVERLAY_CONTENT_WRAPPER_ELEMENTS.FORM}
        className={className}
        isLoading={isLoading || isPending}
        hasPadding
      >
        {children}
      </FullScreenDialog.ContentWrapper>
      <StepDialogFooter
        buttonOptions={{
          size: BUTTON_SIZES.MD,
          className: 'w-[5.625rem] px-5',
        }}
        className={FORM_FULL_SCREEN_DIALOG_FOOTER_DEFAULT_STYLES}
        confirmOptions={confirmOptions}
        goToStep={goToStep}
        isPending={isPending}
        previousOptions={previousOptions}
        step={step}
        steps={steps}
      />
    </FullScreenDialog>
  );
};

export default StepFullScreenDialog;
