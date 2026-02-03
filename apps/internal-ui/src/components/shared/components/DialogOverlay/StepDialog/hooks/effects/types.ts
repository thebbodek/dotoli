import { Dispatch, SetStateAction } from 'react';

import { UseStepDialogParams } from '@/components/shared/components/DialogOverlay/StepDialog/hooks/types';

export interface UseInitialStepEffectProps<T extends string>
  extends Pick<UseStepDialogParams<T>, 'initialStep'> {
  setStep: Dispatch<SetStateAction<T | null>>;
  stepKeys: T[];
}
