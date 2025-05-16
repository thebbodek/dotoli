import { InputHTMLAttributes } from 'react';

export interface CheckboxProps
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    'checked' | 'disabled' | 'readOnly' | 'onChange'
  > {
  label?: string;
}
