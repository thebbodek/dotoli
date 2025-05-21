import { InputHTMLAttributes } from 'react';

import { TOGGLE_SIZES } from '@/components/Toggle/constants';

export type ToggleSize = (typeof TOGGLE_SIZES)[keyof typeof TOGGLE_SIZES];

export interface ToggleProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'className'>,
    Required<
      Pick<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'>
    > {
  size?: ToggleSize;
  label?: string;
}

export interface ToggleIconProps extends Required<Pick<ToggleProps, 'size'>> {}

export interface ToggleLabelProps
  extends Required<Pick<ToggleProps, 'size' | 'label'>> {
  labelId?: string;
}
