import { useId, useState } from 'react';

import InputPasswordRules from '@/components/Input/InputPassword/InputPasswordRules';
import { InputPasswordProps } from '@/components/Input/InputPassword/types';
import { Input, InputBase } from '@/components/Input/shared';
import useInputChange from '@/components/Input/shared/hooks/useInputChange';
import InputIconButton from '@/components/Input/shared/InputIconButton';

const InputPassword = ({
  label,
  feedback,
  badge,
  error = false,
  required = false,
  rootClassName,
  value,
  name,
  rules,
  autoComplete = 'off',
  disabled = false,
  readOnly = false,
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
  });

  const hasRuleError =
    !!rules &&
    Object.entries(rules).some(([_, { regex }]) => !regex.test(inputValue));

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
        type={visible ? 'text' : 'password'}
        value={inputValue}
        name={name}
        onChange={handleChange}
        autoComplete={autoComplete}
        required={required}
        readOnly={readOnly}
        disabled={disabled}
        isFocused={isFocused && !error && hasRuleError}
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
