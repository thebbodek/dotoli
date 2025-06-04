import { ButtonHTMLAttributes, HTMLAttributes } from 'react';

import { ComponentPropsRef } from '@/components/shared/types';

export interface ChipProps
  extends Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onClick' | 'disabled' | 'className'
  > {
  label: string;
  ariaLabel?: string;
}

export interface ChipGroupProps
  extends Pick<HTMLAttributes<HTMLUListElement>, 'className'>,
    ComponentPropsRef<HTMLUListElement> {
  ariaLabel?: string;
}
