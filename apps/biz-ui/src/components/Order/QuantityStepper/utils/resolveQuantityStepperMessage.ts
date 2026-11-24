import { QUANTITY_STEPPER_STATES } from '@/components/Order/QuantityStepper/constants';
import { ResolveQuantityStepperMessageProps } from '@/components/Order/QuantityStepper/types';

export const resolveQuantityStepperMessage = ({
  state,
  errorMessage,
  warningMessage,
}: ResolveQuantityStepperMessageProps) => {
  if (state === QUANTITY_STEPPER_STATES.ERROR) return errorMessage;

  if (state === QUANTITY_STEPPER_STATES.WARNING) return warningMessage;

  return undefined;
};
