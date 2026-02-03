import { useEffect } from 'react';

import { UseInitialStepEffectProps } from '@/components/shared/components/DialogOverlay/StepDialog/hooks/effects/types';

const useInitialStepEffect = <T extends string>({
  initialStep,
  setStep,
  stepKeys,
}: UseInitialStepEffectProps<T>) => {
  useEffect(() => {
    setStep(initialStep ?? stepKeys[0]);
  }, [initialStep]);
};

export default useInitialStepEffect;
