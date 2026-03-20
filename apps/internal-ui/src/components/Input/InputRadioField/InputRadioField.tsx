import { PropsWithChildren } from 'react';

import { InputRadioFieldProvider } from '@/components/Input/InputRadioField/context';
import InputRadioFieldGroup from '@/components/Input/InputRadioField/InputRadioFieldGroup';
import InputRadioFieldItem from '@/components/Input/InputRadioField/InputRadioFieldItem';
import { InputRadioFieldProps } from '@/components/Input/InputRadioField/types';
import InputFieldBase from '@/components/Input/shared/InputFieldBase';
import { RADIO_SIZES } from '@/components/Radio';

const InputRadioField = <T extends string>({
  label,
  hiddenLabel,
  feedback,
  isError,
  required,
  value,
  name,
  onChange,
  children,
  className,
  disabled = false,
  size = RADIO_SIZES.MD,
}: PropsWithChildren<InputRadioFieldProps<T>>) => {
  return (
    <InputFieldBase
      className={className}
      disabled={disabled}
      feedback={feedback}
      hiddenLabel={hiddenLabel}
      isError={isError}
      label={label}
      required={required}
      onChange={onChange}
    >
      <InputRadioFieldProvider name={name} size={size} value={value}>
        <InputRadioFieldGroup>{children}</InputRadioFieldGroup>
      </InputRadioFieldProvider>
    </InputFieldBase>
  );
};

export default InputRadioField;

InputRadioField.Item = InputRadioFieldItem;
