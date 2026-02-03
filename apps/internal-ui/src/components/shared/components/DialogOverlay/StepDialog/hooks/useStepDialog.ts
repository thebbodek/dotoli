import { useState } from 'react';

import { useInitialStepEffect } from '@/components/shared/components/DialogOverlay/StepDialog/hooks/effects';
import { UseStepDialogParams } from '@/components/shared/components/DialogOverlay/StepDialog/hooks/types';
import { StepActionParams } from '@/components/shared/components/DialogOverlay/StepDialog/types';

const useStepDialog = <T extends string>({
  steps,
  initialStep,
}: UseStepDialogParams<T>) => {
  const [step, setStep] = useState<T | null>(null);
  const stepKeys = Object.values(steps);

  const goToStep = ({ step }: StepActionParams<T>) => {
    setStep(step);
  };

  useInitialStepEffect({
    initialStep,
    setStep,
    stepKeys,
  });

  return {
    models: { step },
    operations: { goToStep },
  };
};

export default useStepDialog;
