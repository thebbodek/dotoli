import { GenerateQuantityStepperTotalLabelProps } from '@/components/Order/QuantityStepper/types';

export const generateQuantityStepperTotalLabel = ({
  value,
  unitsPerBox,
}: GenerateQuantityStepperTotalLabelProps) =>
  `총 ${(value ?? 0) * unitsPerBox}개`;
