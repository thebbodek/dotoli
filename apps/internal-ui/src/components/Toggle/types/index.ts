import { HTMLAttributes, InputHTMLAttributes } from 'react';

import { TOGGLE_SIZES } from '@/components/Toggle/constants';
import { ColorVariants } from '@/variants';

export type ToggleSize = (typeof TOGGLE_SIZES)[keyof typeof TOGGLE_SIZES];

export interface ToggleProps
  extends Pick<InputHTMLAttributes<HTMLInputElement>, 'disabled' | 'className'>,
    Required<
      Pick<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'>
    > {
  size?: ToggleSize;
  label?: string;
  labelColor?: ToggleLabelProps['color'];
  labelClassName?: ToggleLabelProps['className'];
}

export interface ToggleIconProps extends Required<Pick<ToggleProps, 'size'>> {}

export interface ToggleLabelProps
  extends Required<Pick<ToggleProps, 'size' | 'label'>>,
    Pick<HTMLAttributes<HTMLSpanElement>, 'className'> {
  color?: Extract<ColorVariants, 'black' | 'gray-06'>;
  labelId?: string;
}
