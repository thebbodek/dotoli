import { ButtonHTMLAttributes, RefAttributes } from 'react';

import {
  ICON_BUTTON_SIZES,
  ICON_BUTTON_STATES,
  ICON_BUTTON_THEMES,
} from '@/components/Button/IconButton/constants';
import { IconProps } from '@/components/Icon';

export type IconButtonTheme =
  (typeof ICON_BUTTON_THEMES)[keyof typeof ICON_BUTTON_THEMES];

export type IconButtonSize =
  (typeof ICON_BUTTON_SIZES)[keyof typeof ICON_BUTTON_SIZES];

export type IconButtonState =
  (typeof ICON_BUTTON_STATES)[keyof typeof ICON_BUTTON_STATES];

export type IconButtonStyles = Record<IconButtonState, string>;

export interface GenerateIconButtonStyleProps
  extends Pick<IconButtonProps, 'theme' | 'size' | 'disabled'> {}

export interface IconButtonProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'className' | 'disabled' | 'onClick' | 'onMouseDown' | 'type'
    >,
    Required<Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'>>,
    Pick<IconProps, 'iconKey' | 'weight'>,
    RefAttributes<HTMLButtonElement> {
  theme?: IconButtonTheme;
  size?: IconButtonSize;
  isPending?: boolean;
}
