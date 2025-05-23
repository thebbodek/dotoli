import {
  BUTTON_SIZES,
  BUTTON_STATE,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
} from '@/components/Button/shared/constants';
import { IconProps } from '@/components/Icon';

export type ButtonVariant =
  (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];

export type ButtonTheme = (typeof BUTTON_THEMES)[keyof typeof BUTTON_THEMES];

export type ButtonSize = (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES];

export type ButtonState = (typeof BUTTON_STATE)[keyof typeof BUTTON_STATE];

export type ButtonStyles = Record<ButtonState, string>;

export interface ButtonDefaultProps {
  label: string;
  variant?: ButtonVariant;
  theme?: ButtonTheme;
  size?: ButtonSize;
  leftIconKey?: IconProps['iconKey'];
  rightIconKey?: IconProps['iconKey'];
  disabled?: boolean;
}

export interface UseButtonRenderErrorEffectProps
  extends Pick<ButtonDefaultProps, 'variant' | 'theme' | 'size'> {}

export interface GenerateButtonStyleProps
  extends Pick<
    ButtonDefaultProps,
    'variant' | 'theme' | 'size' | 'disabled' | 'leftIconKey' | 'rightIconKey'
  > {}

export interface ButtonIconProps
  extends Pick<IconProps, 'iconKey'>,
    Pick<ButtonDefaultProps, 'size'> {}
