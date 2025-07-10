import { GetOptionKeyParams } from '@/components/Select/Multi/shared/types';

export const getOptionKey = ({ value, label }: GetOptionKeyParams) =>
  `${value}-${label}`;
