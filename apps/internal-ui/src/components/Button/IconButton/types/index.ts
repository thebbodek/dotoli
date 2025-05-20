import { ButtonHTMLAttributes } from 'react';

import { ICON_BUTTON_THEMES } from '@/components/Button/IconButton/constants';
import { IconProps } from '@/components/Icon';

export type IconButtonTheme =
  (typeof ICON_BUTTON_THEMES)[keyof typeof ICON_BUTTON_THEMES];

export interface IconButtonProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'className' | 'onClick' | 'disabled' | 'type'
    >,
    Pick<IconProps, 'iconKey'> {
  theme?: IconButtonTheme;
  arialLabel?: string;
}
