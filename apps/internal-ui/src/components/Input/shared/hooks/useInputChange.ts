import { ChangeEvent, useEffect, useState } from 'react';

import {
  InputBaseProps,
  InputElement,
  InputElementType,
  UseInputChangeProps,
} from '@/components/Input/shared/types';

const useInputChange = <T extends InputElementType, P extends InputElement<T>>({
  value,
  name,
  onChange,
  regCallback,
  maxLength,
}: UseInputChangeProps<T, P>) => {
  const [inputValue, setInputValue] = useState<InputBaseProps['value']>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let newValue = e.target.value;

    if (newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength);
    }

    if (regCallback) {
      newValue = regCallback(newValue);
    }

    e.target.value = newValue;

    setInputValue(newValue);
    onChange?.(e);
  };

  const handleReset = () => {
    const eventTargetValue = '';
    const event = {
      target: { value: eventTargetValue, name },
      currentTarget: { value: eventTargetValue, name },
    } as unknown as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

    setInputValue(eventTargetValue);
    onChange?.(event);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return { inputValue, handleChange, handleReset };
};

export default useInputChange;
