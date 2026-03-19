import { InputFieldBaseProps } from '@/components/Input/shared/types';
import { RadioProps } from '@/components/Radio';
import { ToggleProps } from '@/components/Toggle';

export interface InputRadioFieldProps<T extends string>
  extends InputFieldBaseProps,
    InputRadioFieldContextValue<T> {}

export interface InputRadioFieldItemProps<T extends string>
  extends Pick<RadioProps, 'label'>,
    Pick<InputRadioFieldContextValue<T>, 'value'> {}

export interface InputRadioFieldContextValue<T extends string>
  extends Pick<RadioProps, 'size' | 'name'> {
  value: T;
}

export interface InputToggleFieldContextValue
  extends Pick<ToggleProps, 'size' | 'checked'> {}
