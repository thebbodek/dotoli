import { QUANTITY_STEPPER_STATES } from '@/components/Order/QuantityStepper/constants';
import { ResolveQuantityStepperStateProps } from '@/components/Order/QuantityStepper/types';

export const resolveQuantityStepperState = ({
  value,
  max,
}: ResolveQuantityStepperStateProps) => {
  if (value > max) return QUANTITY_STEPPER_STATES.ERROR;

  if (value > 0) return QUANTITY_STEPPER_STATES.FILLED;

  return QUANTITY_STEPPER_STATES.EMPTY;
};
