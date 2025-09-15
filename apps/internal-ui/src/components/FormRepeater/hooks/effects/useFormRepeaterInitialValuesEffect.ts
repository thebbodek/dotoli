import { getUUID } from '@bbodek/utils';
import { useEffect } from 'react';

import { UseFormRepeaterProps } from '@/components/FormRepeater/hooks/types';

const useFormRepeaterInitialValuesEffect = <
  T extends object,
  I extends object,
>({
  originalValues = [],
  key,
  initialValue,
  setValues,
}: Pick<
  UseFormRepeaterProps<T, I>,
  'originalValues' | 'setValues' | 'key' | 'initialValue'
>) => {
  useEffect(() => {
    if (originalValues.length > 0) return;

    setValues((prev) => ({
      ...prev,
      [key]: [{ ...initialValue, id: getUUID() }],
    }));
  }, [originalValues]);
};

export default useFormRepeaterInitialValuesEffect;
