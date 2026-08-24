import { HTMLAttributes } from 'react';

import { BOTTOM_ACTION_BAR_VARIANTS } from '@/components/BottomActionBar/constants';
import { CtaButtonProps } from '@/components/Button';

export type BottomActionBarVariant =
  (typeof BOTTOM_ACTION_BAR_VARIANTS)[keyof typeof BOTTOM_ACTION_BAR_VARIANTS];

export interface BottomActionBarAction
  extends Required<Pick<CtaButtonProps, 'label' | 'onClick'>>,
    Pick<
      CtaButtonProps,
      'variant' | 'theme' | 'size' | 'iconOption' | 'iconPosition'
    > {}

export interface BottomActionBarActionDefault
  extends Required<Pick<CtaButtonProps, 'variant' | 'theme' | 'size'>> {}

export interface ResolveBottomActionBarActionProps {
  action: BottomActionBarAction;
  defaultOption: BottomActionBarActionDefault;
}

export interface BottomActionBarProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  action: BottomActionBarAction;
  subAction?: BottomActionBarAction;
  info?: string;
  variant?: BottomActionBarVariant;
}
