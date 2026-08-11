import { RefAttributes, TextareaHTMLAttributes } from 'react';

import { InputCondition } from '@/components/Input/shared/types';

export interface TextAreaProps
  extends Pick<
      TextareaHTMLAttributes<HTMLTextAreaElement>,
      | 'autoFocus'
      | 'className'
      | 'disabled'
      | 'id'
      | 'maxLength'
      | 'name'
      | 'onBlur'
      | 'onChange'
      | 'onFocus'
      | 'placeholder'
      | 'readOnly'
      | 'required'
      | 'tabIndex'
      | 'value'
    >,
    RefAttributes<HTMLTextAreaElement> {
  label: string;
  errorMessage?: string;
  conditions?: InputCondition[];
  height?: number;
}
