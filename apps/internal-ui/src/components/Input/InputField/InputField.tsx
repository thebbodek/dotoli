import { useId, useState } from 'react';

import { InputFieldProps } from '@/components/Input/InputField/types';
import Input from '@/components/Input/shared/Input';
import InputBase from '@/components/Input/shared/InputBase';
import useInputChange from '@/components/Input/shared/hooks/useInputChange';

const InputField = ({
  label,
  feedback,
  badge,
  error,
  required,
  rootClassName,
  value,
  onChange,
  regCallback,
  ...rest
}: InputFieldProps) => {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const { inputValue, handleChange, handleReset } = useInputChange({
    value,
    onChange,
    regCallback,
  });

  return (
    <InputBase
      id={id}
      value={inputValue}
      label={label}
      feedback={feedback}
      error={error}
      badge={badge}
      required={required}
      className={rootClassName}
    >
      <Input
        id={id}
        value={inputValue}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        onChange={handleChange}
        onReset={handleReset}
        required={required}
        {...rest}
      />
    </InputBase>
  );
};

export default InputField;
