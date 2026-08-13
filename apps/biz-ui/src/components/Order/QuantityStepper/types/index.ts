import { HTMLAttributes } from 'react';

import { QUANTITY_STEPPER_STATES } from '@/components/Order/QuantityStepper/constants';
import { ColorVariants } from '@/variants';

export type QuantityStepperState =
  (typeof QUANTITY_STEPPER_STATES)[keyof typeof QUANTITY_STEPPER_STATES];

export type QuantityStepperStyles = Record<'NAME' | 'MESSAGE', ColorVariants>;

export interface QuantityStepperStateStyles {
  INPUT: string;
  TOTAL: string;
  TOTAL_LABEL: ColorVariants;
}

export interface ParseQuantityInputParams {
  value: string;
}

export interface QuantityStepperProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  name: string;
  imageUrl: string;
  value: number;
  unitsPerBox: number;
  onChange: (value: number) => void;
  errorMessage?: string;
  max?: number;
  placeholder?: string;
}

export type ResolveQuantityStepperStateProps = Pick<
  QuantityStepperProps,
  'value'
> &
  Required<Pick<QuantityStepperProps, 'max'>>;

export type GenerateQuantityStepperTotalLabelProps = Pick<
  QuantityStepperProps,
  'value' | 'unitsPerBox'
>;
