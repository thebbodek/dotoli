import { FormEvent, useId, useState } from 'react';

import { InputSearchProps } from '@/components/Input/InputSearch/types';
import { Input, InputBase } from '@/components/Input/shared';
import useInputChange from '@/components/Input/shared/hooks/useInputChange';
import InputIconButton from '@/components/Input/shared/InputIconButton';
import { INPUT_TRIGGER_VARIANTS } from '@/components/shared';

const InputSearch = ({
  label,
  hiddenLabel,
  feedback,
  badge,
  isError = false,
  required = false,
  className,
  value,
  name,
  autoComplete = 'off',
  disabled = false,
  readOnly = false,
  onChange,
  regCallback,
  onSubmit,
  ...rest
}: InputSearchProps) => {
  const id = useId();
  const isDisabled = disabled || readOnly;
  const [isFocused, setIsFocused] = useState(false);
  const { inputValue, handleChange, handleReset } = useInputChange({
    value,
    name,
    onChange,
    regCallback,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (isDisabled) return;

    handleReset();
    onSubmit!(e);
  };

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
      onSubmit={onSubmit ? handleSubmit : undefined}
    >
      <Input
        id={id}
        variant={INPUT_TRIGGER_VARIANTS.SEARCH}
        value={inputValue}
        name={name}
        onChange={handleChange}
        autoComplete={autoComplete}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        onReset={handleReset}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        addonEnd={
          <InputIconButton
            type='submit'
            ariaLabel='검색'
            iconKey={'magnifying-glass'}
            weight='bold'
            disabled={isDisabled}
          />
        }
        {...rest}
      />
    </InputBase>
  );
};

export default InputSearch;
