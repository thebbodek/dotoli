import { useId, useState } from 'react';

import { InputFieldProps } from '@/components/Input/InputField/types';
import { INPUT_DEFAULT_MAX_LENGTH } from '@/components/Input/shared/constants';
import useInputChange from '@/components/Input/shared/hooks/useInputChange';
import Input from '@/components/Input/shared/Input';
import InputBase from '@/components/Input/shared/InputBase';

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
      badge={badge}
      className={className}
      feedback={feedback}
      hiddenLabel={hiddenLabel}
      id={id}
      isError={isError}
      label={label}
      required={required}
      value={inputValue}
    >
      <Input
        id={id}
        isFocused={isFocused}
        name={name}
        required={required}
        setIsFocused={setIsFocused}
        value={inputValue}
        onChange={handleChange}
        onReset={handleReset}
        {...rest}
      />
    </InputBase>
  );
};

export default InputField;
