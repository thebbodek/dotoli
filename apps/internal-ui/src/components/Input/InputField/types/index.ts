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
      'label' | 'feedback' | 'error' | 'required' | 'badge'
    >,
    Pick<
      InputProps<typeof INPUT_ELEMENTS.INPUT, HTMLInputElement>,
      | 'id'
      | 'required'
      | 'value'
      | 'className'
      | 'placeholder'
      | 'disabled'
      | 'readOnly'
      | 'name'
      | 'autoComplete'
      | 'onChange'
      | 'ref'
    >,
    Pick<
      UseInputChangeProps<typeof INPUT_ELEMENTS.INPUT, HTMLInputElement>,
      'regCallback'
    > {
  type?: Extract<HTMLInputTypeAttribute, 'text' | 'email' | 'number'>;
  rootClassName?: InputBaseProps['className'];
}
