import { PropsWithChildren } from 'react';

import { InputToggleFieldProvider } from '@/components/Input/InputToggleField/context';
import InputToggleFieldItem from '@/components/Input/InputToggleField/InputToggleFieldItem';
import { InputToggleFieldProps } from '@/components/Input/InputToggleField/types';
import InputFieldBase from '@/components/Input/shared/InputFieldBase';
import { TOGGLE_SIZES } from '@/components/Toggle';

const InputToggleField = ({
  className,
  disabled,
  feedback,
  hiddenLabel,
  isError,
  label,
  required,
  checked,
  size = TOGGLE_SIZES.SM,
  onChange,
  children,
}: PropsWithChildren<InputToggleFieldProps>) => {
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
      <InputToggleFieldProvider checked={checked} size={size}>
        {children}
      </InputToggleFieldProvider>
    </InputFieldBase>
  );
};

export default InputToggleField;

InputToggleField.Item = InputToggleFieldItem;
