import { ParseQuantityInputParams } from '@/components/Order/QuantityStepper/types';

export const parseQuantityInput = ({ value }: ParseQuantityInputParams) => {
  const digits = value.replace(/\D/g, '');

  return digits ? Number(digits) : 0;
};
