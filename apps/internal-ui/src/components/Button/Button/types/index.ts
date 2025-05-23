import { ButtonHTMLAttributes } from 'react';

import { ButtonPrimitiveProps } from '@/components/Button/shared/types';
import { ComponentPropsRef } from '@/components/shared';

export interface ButtonProps
  extends ButtonPrimitiveProps,
    Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'type' | 'className' | 'onClick'
    >,
    ComponentPropsRef<HTMLButtonElement> {}
