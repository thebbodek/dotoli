import { InputFieldBaseProps } from '@/components/Input/shared/types';
import { ToggleProps } from '@/components/Toggle';

export interface InputToggleFieldProps
  extends InputFieldBaseProps,
    InputToggleFieldContextValue {}

export interface InputToggleFieldContextValue
  extends Pick<ToggleProps, 'size' | 'checked'> {}
