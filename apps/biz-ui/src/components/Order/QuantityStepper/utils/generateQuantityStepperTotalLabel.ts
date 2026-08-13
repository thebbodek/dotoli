import { GenerateQuantityStepperTotalLabelProps } from '@/components/Order/QuantityStepper/types';

export const generateQuantityStepperTotalLabel = ({
  value,
  unitsPerBox,
}: GenerateQuantityStepperTotalLabelProps) => `총 ${value * unitsPerBox}개`;
