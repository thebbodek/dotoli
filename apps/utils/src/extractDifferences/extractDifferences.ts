import { isEqual } from 'es-toolkit';

import { ExtractDifferencesParams } from '@/extractDifferences/types';

export const extractDifferences = <T extends object>({
  values,
  originalValues,
}: ExtractDifferencesParams<T>) => {
  const changedValues: Partial<T> = {};

  Object.entries(values).forEach(([valueKey, value]) => {
    const key = valueKey as keyof T;
    const originalValue = originalValues[key];

    if (!isEqual(value, originalValue)) {
      changedValues[key] = value;
    }
  });

  return changedValues;
};
