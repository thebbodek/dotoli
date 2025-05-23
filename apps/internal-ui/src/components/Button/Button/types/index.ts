import { ButtonHTMLAttributes } from 'react';

import { ButtonDefaultProps } from '@/components/Button/shared/types';
import { ComponentPropsRef } from '@/components/shared';

export interface ButtonProps
  extends ButtonDefaultProps,
    Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'type' | 'className' | 'onClick'
    >,
    ComponentPropsRef<HTMLButtonElement> {}
