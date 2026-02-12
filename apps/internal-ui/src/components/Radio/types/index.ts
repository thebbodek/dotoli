import { InputHTMLAttributes } from 'react';

import { RADIO_SIZES } from '@/components/Radio/constants';

export type RadioSize = (typeof RADIO_SIZES)[keyof typeof RADIO_SIZES];

export interface RadioBaseProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'className'>,
    Required<
      Pick<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'>
    > {}

export interface RadioProps extends Omit<RadioBaseProps, 'label'> {
  size?: RadioSize;
  label?: string;
}

export interface RadioIconProps extends Required<Pick<RadioProps, 'size'>> {}

export interface RadioLabelProps
  extends Required<Pick<RadioProps, 'size' | 'label'>> {
  labelId?: string;
}
