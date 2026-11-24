import { QUANTITY_STEPPER_STATES } from '@/components/Order/QuantityStepper/constants';
import { ResolveQuantityStepperStateProps } from '@/components/Order/QuantityStepper/types';

export const resolveQuantityStepperState = ({
  value,
  max,
  warningMessage,
}: ResolveQuantityStepperStateProps) => {
  if (value === null) return QUANTITY_STEPPER_STATES.EMPTY;

  if (value > max) return QUANTITY_STEPPER_STATES.ERROR;

  if (warningMessage) return QUANTITY_STEPPER_STATES.WARNING;

  return QUANTITY_STEPPER_STATES.FILLED;
};
