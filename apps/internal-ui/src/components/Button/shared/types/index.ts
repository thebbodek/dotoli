import {
  BUTTON_ICON_POSITIONS,
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

export type ButtonIconPosition =
  (typeof BUTTON_ICON_POSITIONS)[keyof typeof BUTTON_ICON_POSITIONS];

export type ButtonStyles = Record<ButtonState, string>;

export interface ButtonPrimitiveProps {
  label: string;
  variant?: ButtonVariant;
  theme?: ButtonTheme;
  size?: ButtonSize;
  iconOption?: Pick<IconProps, 'iconKey'>;
  iconPosition?: ButtonIconPosition;
  disabled?: boolean;
}

export interface UseButtonRenderErrorEffectProps
  extends Pick<ButtonPrimitiveProps, 'variant' | 'theme' | 'size'> {}

export interface GenerateButtonStyleProps
  extends Pick<
    ButtonPrimitiveProps,
    'variant' | 'theme' | 'size' | 'disabled' | 'iconOption' | 'iconPosition'
  > {}

export interface ButtonIconProps
  extends Pick<IconProps, 'iconKey' | 'className'>,
    Pick<ButtonPrimitiveProps, 'size'> {}
