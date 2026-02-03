import { Button } from '@/components/Button';
import { StepDialogPreviousButtonProps } from '@/components/shared/components/DialogOverlay/StepDialog/types';

const StepDialogPreviousButton = <T extends string>({
  currentIndex,
  stepKeys,
  isPending,
  previousOptions,
  goToStep,
  buttonOptions,
}: StepDialogPreviousButtonProps<T>) => {
  const { disabled = true, onClick } = previousOptions ?? {};
  const hasPreviousStep = currentIndex !== null && currentIndex > 0;

  const handleClick = () => {
    if (!currentIndex) return;

    goToStep({ step: stepKeys[currentIndex - 1] });
    onClick?.({ step: stepKeys[currentIndex] });
  };

  return (
    <Button
      {...buttonOptions}
      disabled={isPending || !hasPreviousStep || !disabled}
      label='이전'
      theme='gray'
      variant='outlined'
      onClick={handleClick}
    />
  );
};

export default StepDialogPreviousButton;
