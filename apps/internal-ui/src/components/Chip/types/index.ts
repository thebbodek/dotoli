import { ButtonHTMLAttributes, HTMLAttributes } from 'react';

import { ComponentPropsRef } from '@/components/shared/types';

export interface ChipProps
  extends Pick<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'onClick' | 'disabled' | 'className' | 'aria-label'
  > {
  label: string;
}

export interface ChipGroupProps
  extends Pick<HTMLAttributes<HTMLUListElement>, 'className' | 'aria-label'>,
    ComponentPropsRef<HTMLUListElement> {}
