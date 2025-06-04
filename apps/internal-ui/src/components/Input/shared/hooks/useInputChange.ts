import {
  InputElement,
  InputElementType,
  UseInputChangeProps,
} from '@/components/Input/shared/types';
import { ChangeEvent, useState } from 'react';

const useInputChange = <T extends InputElementType, P extends InputElement<T>>({
  value,
  name,
  onChange,
  regCallback,
}: UseInputChangeProps<T, P>) => {
  const [inputValue, setInputValue] = useState(value ?? '');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = regCallback ? regCallback(e.target.value) : e.target.value;

    e.target.value = value;
    setInputValue(value);
    onChange?.(e);
  };

  const handleReset = () => {
    const value = '';
    const event = {
      target: { value, name },
      currentTarget: { value, name },
    } as unknown as ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

    setInputValue(value);
    onChange?.(event);
  };

  return { inputValue, handleChange, handleReset };
};

export default useInputChange;
