import { Button } from '@/components/Button';
import { StepDialogConfirmButtonProps } from '@/components/shared/components/DialogOverlay/StepDialog/types';
import { OVERLAY_CONFIRM_TOOLTIP_GAP } from '@/components/shared/components/Overlay';
import { Tooltip } from '@/components/Tooltip';

const StepDialogConfirmButton = <T extends string>({
  currentIndex,
  stepKeys,
  confirmOptions,
  isPending,
  goToStep,
  buttonOptions,
}: StepDialogConfirmButtonProps<T>) => {
  const { disabled, onClick, tooltipOption } = confirmOptions;
  const { useTooltip = false, content } = tooltipOption ?? {};

  const hasNextStep =
    currentIndex !== null && currentIndex < stepKeys.length - 1;
  const canNextStep = hasNextStep ? hasNextStep : true;

  const handleClick = () => {
    const nextStep = stepKeys[currentIndex + 1];

    if (hasNextStep) {
      goToStep({ step: nextStep });
    }

    onClick?.({ step: stepKeys[currentIndex] });
  };

  return (
    <Tooltip
      content={content}
      gap={OVERLAY_CONFIRM_TOOLTIP_GAP}
      hidden={!useTooltip}
    >
      <Button
        {...buttonOptions}
        disabled={isPending || !canNextStep || disabled}
        label={hasNextStep ? '다음' : '완료'}
        theme='primary'
        onClick={handleClick}
      />
    </Tooltip>
  );
};

export default StepDialogConfirmButton;
