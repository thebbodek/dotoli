import { useId, useState } from 'react';

import { InputFieldProps } from '@/components/Input/InputField/types';
import Input from '@/components/Input/shared/Input';
import InputBase from '@/components/Input/shared/InputBase';
import useInputChange from '@/components/Input/shared/hooks/useInputChange';

const InputField = ({
  label,
  feedback,
  badge,
  error = false,
  required = false,
  rootClassName,
  value,
  onChange,
  regCallback,
  className,
  disabled = false,
  readOnly = false,
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
      isFocused={isFocused}
      className={rootClassName}
    >
      <Input
        id={id}
        value={inputValue}
        onChange={handleChange}
        className={className}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        onReset={handleReset}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        {...rest}
      />
    </InputBase>
  );
};

export default InputField;
