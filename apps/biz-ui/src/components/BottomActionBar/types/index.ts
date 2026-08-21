import { HTMLAttributes } from 'react';

import { BOTTOM_ACTION_BAR_VARIANTS } from '@/components/BottomActionBar/constants';
import { CtaButtonProps } from '@/components/Button';

export type BottomActionBarVariant =
  (typeof BOTTOM_ACTION_BAR_VARIANTS)[keyof typeof BOTTOM_ACTION_BAR_VARIANTS];

export interface BottomActionBarAction
  extends Required<Pick<CtaButtonProps, 'label' | 'onClick'>> {}

export interface BottomActionBarProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  confirm: BottomActionBarAction;
  cancel?: BottomActionBarAction;
  info?: string;
  variant?: BottomActionBarVariant;
}
