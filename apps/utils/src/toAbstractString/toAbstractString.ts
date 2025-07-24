import { DEFAULT_COUNT_SUFFIX } from '@/toAbstractString/constants';
import { ToAbstractStringParam } from '@/toAbstractString/types';

export const toAbstractString = ({
  values,
  suffix = DEFAULT_COUNT_SUFFIX,
  max = 2,
}: ToAbstractStringParam) => {
  const hasValues = values.length > 0;

  if (!hasValues) return null;

  const maxIndex = max - 1;
  const filteredValues = values
    .slice(0, max)
    .filter((value, index) => index <= maxIndex && value);

  const remainingCount = values.length - filteredValues.length;
  const hasRemaining = remainingCount > 0;
  const value = filteredValues.join(', ');
  const remaining = hasRemaining ? `외 ${remainingCount + suffix}` : '';

  return { value, remaining };
};
