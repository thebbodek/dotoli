import { ButtonHTMLAttributes, HTMLAttributes } from 'react';

import { ColorVariants } from '@/variants/color/types';

export interface ChipProps
  extends Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onClick' | 'disabled' | 'className'
  > {
  label: string;
  color?: ColorVariants;
  backgroundColor?: ColorVariants;
}

export interface ChipGroupProps
  extends Pick<HTMLAttributes<HTMLUListElement>, 'className'> {}
