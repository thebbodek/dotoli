import { ButtonHTMLAttributes } from 'react';

import { ICON_BUTTON_COLORS } from '@/components/Button/IconButton/constants';
import { IconProps } from '@/components/Icon';

export type IconButtonColor =
  (typeof ICON_BUTTON_COLORS)[keyof typeof ICON_BUTTON_COLORS];

export interface IconButtonProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'className' | 'onClick' | 'disabled' | 'type'
    >,
    Pick<IconProps, 'iconKey'> {
  color?: IconButtonColor;
  arialLabel?: string;
}
