import { QUANTITY_STEPPER_STATES } from '@/components/Order/QuantityStepper/constants';
import { ResolveQuantityStepperStateProps } from '@/components/Order/QuantityStepper/types';

export const resolveQuantityStepperState = ({
  value,
  max,
}: ResolveQuantityStepperStateProps) => {
  if (value === null) return QUANTITY_STEPPER_STATES.EMPTY;

  if (value > max) return QUANTITY_STEPPER_STATES.ERROR;

  return QUANTITY_STEPPER_STATES.FILLED;
};
