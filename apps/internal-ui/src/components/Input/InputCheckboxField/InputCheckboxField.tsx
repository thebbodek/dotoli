import { PropsWithChildren } from 'react';

import { InputCheckboxFieldProvider } from '@/components/Input/InputCheckboxField/context';
import InputCheckboxFieldGroup from '@/components/Input/InputCheckboxField/InputCheckboxFieldGroup';
import InputCheckboxFieldItem from '@/components/Input/InputCheckboxField/InputCheckboxFieldItem';
import { InputCheckboxFieldProps } from '@/components/Input/InputCheckboxField/types';
import InputFieldBase from '@/components/Input/shared/InputFieldBase';

const InputCheckboxField = <T extends string>({
  feedback,
  hiddenLabel,
  isError,
  label,
  required,
  values,
  onChange,
  children,
  name,
  size,
  className,
  disabled = false,
}: PropsWithChildren<InputCheckboxFieldProps<T>>) => {
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
      <InputCheckboxFieldProvider name={name} size={size} values={values}>
        <InputCheckboxFieldGroup>{children}</InputCheckboxFieldGroup>
      </InputCheckboxFieldProvider>
    </InputFieldBase>
  );
};

export default InputCheckboxField;

InputCheckboxField.Item = InputCheckboxFieldItem;
