import { InputHTMLAttributes } from 'react';

import { CHECKBOX_SIZES } from '@/components/Checkbox/constants';

export type CheckboxSize = (typeof CHECKBOX_SIZES)[keyof typeof CHECKBOX_SIZES];

export interface CheckboxProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'className'>,
    Required<
      Pick<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'>
    > {
  size?: CheckboxSize;
  label?: string;
}

export interface CheckboxIconProps
  extends Required<Pick<CheckboxProps, 'size'>> {}

export interface CheckboxLabelProps
  extends Required<Pick<CheckboxProps, 'size' | 'label'>> {
  labelId?: string;
}
