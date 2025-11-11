import { HTMLInputTypeAttribute } from 'react';

import { INPUT_ELEMENTS } from '@/components/Input/shared/constants';
import {
  InputBaseProps,
  InputProps,
  UseInputChangeProps,
} from '@/components/Input/shared/types';

export interface InputFieldProps
  extends Pick<
      InputBaseProps,
      | 'label'
      | 'feedback'
      | 'isError'
      | 'required'
      | 'badge'
      | 'hiddenLabel'
      | 'className'
    >,
    Pick<
      InputProps<typeof INPUT_ELEMENTS.INPUT, HTMLInputElement>,
      | 'id'
      | 'value'
      | 'placeholder'
      | 'disabled'
      | 'readOnly'
      | 'name'
      | 'autoComplete'
      | 'onChange'
      | 'ref'
      | 'maxLength'
    >,
    Pick<
      UseInputChangeProps<typeof INPUT_ELEMENTS.INPUT, HTMLInputElement>,
      'regCallback'
    > {
  type?: Extract<HTMLInputTypeAttribute, 'text' | 'email' | 'number'>;
}
