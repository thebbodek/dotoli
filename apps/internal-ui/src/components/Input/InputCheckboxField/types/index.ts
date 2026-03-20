import { CheckboxProps } from '@/components/Checkbox';
import { InputFieldBaseProps } from '@/components/Input/shared';

export interface InputCheckboxFieldProps<T extends string>
  extends InputFieldBaseProps,
    InputCheckboxFieldContextValue<T> {}

export interface InputCheckboxFieldItemProps<T extends string>
  extends Pick<CheckboxProps, 'label'> {
  value: T;
}

export interface InputCheckboxFieldContextValue<T extends string>
  extends Pick<CheckboxProps, 'name' | 'size'> {
  values: T[];
}
