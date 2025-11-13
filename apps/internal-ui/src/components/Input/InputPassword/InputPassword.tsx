import { useId, useState } from 'react';

import InputPasswordRules from '@/components/Input/InputPassword/InputPasswordRules';
import { InputPasswordProps } from '@/components/Input/InputPassword/types';
import {
  Input,
  INPUT_DEFAULT_MAX_LENGTH,
  InputBase,
} from '@/components/Input/shared';
import useInputChange from '@/components/Input/shared/hooks/useInputChange';
import InputIconButton from '@/components/Input/shared/InputIconButton';

const InputPassword = ({
  label,
  hiddenLabel,
  feedback,
  badge,
  isError = false,
  required = false,
  className,
  value,
  name,
  rules,
  autoComplete = 'off',
  disabled = false,
  readOnly = false,
  maxLength = INPUT_DEFAULT_MAX_LENGTH,
  onChange,
  regCallback,
  ...rest
}: InputPasswordProps) => {
  const id = useId();
  const isDisabled = disabled || readOnly;
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { inputValue, handleChange } = useInputChange({
    value,
    name,
    onChange,
    regCallback,
    maxLength,
  });

  const hasRuleError =
    !!rules &&
    Object.values(rules).some(
      ({ regex }) => !!inputValue && !regex.test(inputValue),
    );

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
        addonEnd={
          <InputIconButton
            aria-label={isVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
            disabled={isDisabled}
            iconKey={isVisible ? 'eye' : 'eye-slash'}
            onClick={() => setIsVisible((v) => !v)}
          />
        }
        popover={
          rules && <InputPasswordRules rules={rules} value={inputValue} />
        }
        autoComplete={autoComplete}
        disabled={disabled}
        id={id}
        isFocused={isFocused && !isError && hasRuleError}
        name={name}
        readOnly={readOnly}
        required={required}
        setIsFocused={setIsFocused}
        type={isVisible ? 'text' : 'password'}
        value={inputValue}
        onChange={handleChange}
        {...rest}
      />
    </InputBase>
  );
};

export default InputPassword;
