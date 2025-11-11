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
  const [visible, setVisible] = useState(false);
  const { inputValue, handleChange } = useInputChange({
    value,
    name,
    onChange,
    regCallback,
    maxLength,
  });

  const hasRuleError =
    !!rules &&
    Object.entries(rules).some(
      ([_, { regex }]) => !!inputValue && !regex.test(inputValue),
    );

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
        type={visible ? 'text' : 'password'}
        value={inputValue}
        name={name}
        onChange={handleChange}
        autoComplete={autoComplete}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        isFocused={isFocused && !isError && hasRuleError}
        setIsFocused={setIsFocused}
        popover={
          rules && <InputPasswordRules rules={rules} value={inputValue} />
        }
        addonEnd={
          <InputIconButton
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? '비밀번호 숨기기' : '비밀번호 보기'}
            disabled={isDisabled}
            iconKey={visible ? 'eye' : 'eye-slash'}
          />
        }
        {...rest}
      />
    </InputBase>
  );
};

export default InputPassword;
