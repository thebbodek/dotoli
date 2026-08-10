import { ButtonHTMLAttributes, RefAttributes } from 'react';

import { FLOATING_PILL_VARIANTS } from '@/components/Button/FloatingPill/constants';

export type FloatingPillVariant =
  (typeof FLOATING_PILL_VARIANTS)[keyof typeof FLOATING_PILL_VARIANTS];

export interface FloatingPillProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'className' | 'onClick' | 'type'
    >,
    RefAttributes<HTMLButtonElement> {
  label: string;
  variant?: FloatingPillVariant;
}
