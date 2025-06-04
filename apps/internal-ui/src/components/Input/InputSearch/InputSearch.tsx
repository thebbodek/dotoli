import { useId, useState } from 'react';

import { InputSearchProps } from '@/components/Input/InputSearch/types';
import { Input, INPUT_VARIANTS, InputBase } from '@/components/Input/shared';
import useInputChange from '@/components/Input/shared/hooks/useInputChange';
import InputIconButton from '@/components/Input/shared/InputIconButton';

const InputSearch = ({
  label,
  feedback,
  badge,
  error = false,
  required = false,
  rootClassName,
  value,
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
    onChange,
    regCallback,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!onSubmit) return;

    handleReset();
    onSubmit(e);
  };

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
      onSubmit={isDisabled ? undefined : handleSubmit}
    >
      <Input
        id={id}
        variant={INPUT_VARIANTS.SEARCH}
        value={inputValue}
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
            aria-label='검색'
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
