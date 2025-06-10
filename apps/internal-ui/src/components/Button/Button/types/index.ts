import { ButtonHTMLAttributes } from 'react';

import { ButtonPrimitiveProps } from '@/components/Button/shared/types';
import { ComponentPropsRef } from '@/components/shared/types';

export interface ButtonProps
  extends ButtonPrimitiveProps,
    Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'type' | 'className' | 'onClick'
    >,
    ComponentPropsRef<HTMLButtonElement> {
  isPending?: boolean;
}
