import { useEffect } from 'react';

import {
  MultiSelectBaseValue,
  UseMultiSelectBaseInitialOptionsEffectProps,
} from '@/components/Select/Multi/shared/types';
import { getOptionKey } from '@/components/Select/Multi/shared/utils';

const useMultiSelectBaseInitialOptionsEffect = <
  T extends MultiSelectBaseValue,
>({
  value,
  options,
  setInternalOptions,
}: UseMultiSelectBaseInitialOptionsEffectProps<T>) => {
  useEffect(() => {
    const _value = value.map(({ value }) => value);
    const initialInternalOptions = options.map((option) => ({
      ...option,
      key: getOptionKey({ value: option.value, label: option.label }),
      isSelected: _value.includes(option.value),
    }));

    setInternalOptions(initialInternalOptions);
  }, [value, options]);
};

export default useMultiSelectBaseInitialOptionsEffect;
