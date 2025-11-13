import { FormEvent, useId, useState } from 'react';

import { InputSearchProps } from '@/components/Input/InputSearch/types';
import {
  Input,
  INPUT_DEFAULT_MAX_LENGTH,
  InputBase,
} from '@/components/Input/shared';
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
  maxLength = INPUT_DEFAULT_MAX_LENGTH,
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
    maxLength,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (isDisabled) return;

    handleReset();
    onSubmit!(e);
  };

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
      onSubmit={onSubmit ? handleSubmit : undefined}
    >
      <Input
        addonEnd={
          <InputIconButton
            aria-label='검색'
            disabled={isDisabled}
            iconKey='magnifying-glass'
            type='submit'
            weight='bold'
          />
        }
        autoComplete={autoComplete}
        disabled={disabled}
        id={id}
        isFocused={isFocused}
        name={name}
        readOnly={readOnly}
        required={required}
        setIsFocused={setIsFocused}
        value={inputValue}
        variant={INPUT_TRIGGER_VARIANTS.SEARCH}
        onChange={handleChange}
        onReset={handleReset}
        {...rest}
      />
    </InputBase>
  );
};

export default InputSearch;
