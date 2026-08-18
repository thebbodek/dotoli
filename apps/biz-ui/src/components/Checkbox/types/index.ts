import { InputHTMLAttributes, RefAttributes } from 'react';

import { CHECKBOX_STATES } from '@/components/Checkbox/constants';

export type CheckboxState =
  (typeof CHECKBOX_STATES)[keyof typeof CHECKBOX_STATES];

export interface ResolveCheckboxStateProps
  extends Pick<CheckboxProps, 'checked' | 'disabled'> {}

export interface CheckboxIconProps
  extends Pick<CheckboxProps, 'checked' | 'disabled'> {}

export interface CheckboxProps
  extends Pick<
      InputHTMLAttributes<HTMLInputElement>,
      | 'aria-label'
      | 'aria-labelledby'
      | 'className'
      | 'disabled'
      | 'id'
      | 'name'
      | 'value'
    >,
    Required<
      Pick<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'>
    >,
    RefAttributes<HTMLInputElement> {}
