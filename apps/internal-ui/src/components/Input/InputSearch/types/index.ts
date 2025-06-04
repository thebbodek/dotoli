import { InputFieldProps } from '@/components/Input/InputField';
import { InputBaseProps } from '@/components/Input/shared';

export interface InputSearchProps
  extends Omit<InputFieldProps, 'type'>,
    Pick<InputBaseProps, 'onSubmit'> {}
