import { ButtonHTMLAttributes } from 'react';

import { ICON_BUTTON_COLORS } from '@/components/Button/IconButton/constants';
import { IconProps } from '@/components/Icon';

export type IconButtonColors =
  (typeof ICON_BUTTON_COLORS)[keyof typeof ICON_BUTTON_COLORS];

export interface IconButtonProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'className' | 'onClick' | 'disabled'
    >,
    Pick<IconProps, 'iconKey'> {
  color?: IconButtonColors;
  arialLabel?: string;
}
