import { useId, useState } from 'react';

import { InputFieldProps } from '@/components/Input/InputField/types';
import Input from '@/components/Input/shared/Input';
import InputBase from '@/components/Input/shared/InputBase';
import { INPUT_DEFAULT_MAX_LENGTH } from '@/components/Input/shared/constants';
import useInputChange from '@/components/Input/shared/hooks/useInputChange';

const InputField = ({
  label,
  hiddenLabel,
  feedback,
  badge,
  isError,
  required,
  value,
  name,
  maxLength = INPUT_DEFAULT_MAX_LENGTH,
  onChange,
  regCallback,
  className,
  ...rest
}: InputFieldProps) => {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const { inputValue, handleChange, handleReset } = useInputChange({
    value,
    name,
    onChange,
    regCallback,
    maxLength,
  });

  return (
    <InputBase
      id={id}
      value={inputValue}
      label={label}
      hiddenLabel={hiddenLabel}
      feedback={feedback}
      isError={isError}
      badge={badge}
      required={required}
      className={className}
    >
      <Input
        id={id}
        value={inputValue}
        name={name}
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
