import { ButtonHTMLAttributes } from 'react';

import { ButtonProps } from '@/components/Button/Button';
import { ICON_BUTTON_THEMES } from '@/components/Button/IconButton/constants';
import { IconProps } from '@/components/Icon';
import { ComponentPropsRef } from '@/components/shared';

export type IconButtonTheme =
  (typeof ICON_BUTTON_THEMES)[keyof typeof ICON_BUTTON_THEMES];

export interface IconButtonProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'className' | 'onClick' | 'disabled' | 'type'
    >,
    Pick<IconProps, 'iconKey'>,
    Pick<ButtonProps, 'isPending'>,
    ComponentPropsRef<HTMLButtonElement> {
  theme?: IconButtonTheme;
  arialLabel: Required<ButtonHTMLAttributes<HTMLButtonElement>['aria-label']>;
}
