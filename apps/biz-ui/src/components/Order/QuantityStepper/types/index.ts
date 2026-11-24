import { HTMLAttributes } from 'react';

import { QUANTITY_STEPPER_STATES } from '@/components/Order/QuantityStepper/constants';
import { ColorVariants } from '@/variants';

export type QuantityStepperState =
  (typeof QUANTITY_STEPPER_STATES)[keyof typeof QUANTITY_STEPPER_STATES];

export interface QuantityStepperStateStyles {
  INPUT: string;
  TOTAL: ColorVariants;
  MESSAGE?: ColorVariants;
}

export interface ParseQuantityInputParams {
  value: string;
}

export interface QuantityStepperProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  name: string;
  value: number | null;
  unitsPerBox: number;
  onChange: (value: number | null) => void;
  errorMessage?: string;
  warningMessage?: string;
  max?: number;
  placeholder?: string;
}

export interface ResolveQuantityStepperStateProps
  extends Pick<QuantityStepperProps, 'value' | 'warningMessage'>,
    Required<Pick<QuantityStepperProps, 'max'>> {}

export interface ResolveQuantityStepperMessageProps
  extends Pick<QuantityStepperProps, 'errorMessage' | 'warningMessage'> {
  state: QuantityStepperState;
}

export interface GenerateQuantityStepperTotalLabelProps
  extends Pick<QuantityStepperProps, 'value' | 'unitsPerBox'> {}
