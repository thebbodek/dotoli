import { INPUT_ELEMENTS } from '@/components/Input/shared';
import {
  InputBaseProps,
  InputProps,
  UseInputChangeProps,
} from '@/components/Input/shared/types';

export interface TextAreaProps
  extends Pick<
      InputBaseProps,
      'label' | 'feedback' | 'error' | 'required' | 'badge'
    >,
    Pick<
      InputProps<typeof INPUT_ELEMENTS.TEXTAREA, HTMLTextAreaElement>,
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
      | 'inputClassName'
    >,
    Pick<
      UseInputChangeProps<typeof INPUT_ELEMENTS.TEXTAREA, HTMLTextAreaElement>,
      'regCallback'
    > {
  rootClassName?: InputBaseProps['className'];
  maxLength?: number;
}
