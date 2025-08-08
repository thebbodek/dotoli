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
}: UseInputChangeProps<T, P>) => {
  const [inputValue, setInputValue] = useState<InputBaseProps['value']>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const eventTargetValue = regCallback
      ? regCallback(e.target.value)
      : e.target.value;

    e.target.value = eventTargetValue;
    setInputValue(e.target.value);
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
