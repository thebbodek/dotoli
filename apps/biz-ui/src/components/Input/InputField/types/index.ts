import { HTMLAttributes, InputHTMLAttributes, RefAttributes } from 'react';

import { INPUT_FIELD_TYPES } from '@/components/Input/InputField/constants';
import { InputCondition } from '@/components/Input/shared/types';

export type InputFieldType =
  (typeof INPUT_FIELD_TYPES)[keyof typeof INPUT_FIELD_TYPES];

export interface InputFieldProps
  extends Pick<
      InputHTMLAttributes<HTMLInputElement>,
      | 'autoComplete'
      | 'autoFocus'
      | 'className'
      | 'disabled'
      | 'id'
      | 'inputMode'
      | 'maxLength'
      | 'name'
      | 'onChange'
      | 'placeholder'
      | 'readOnly'
      | 'required'
      | 'tabIndex'
      | 'value'
    >,
    Pick<
      HTMLAttributes<HTMLInputElement | HTMLButtonElement>,
      'onBlur' | 'onClick' | 'onFocus'
    >,
    RefAttributes<HTMLInputElement | HTMLButtonElement> {
  label: string;
  type?: InputFieldType;
  errorMessage?: string;
  conditions?: InputCondition[];
  verifyLabel?: string;
  isOpen?: boolean;
  onClear?: () => void;
  onVerify?: () => void;
}
