import { HTMLAttributes } from 'react';

import {
  BUTTON_ICON_POSITIONS,
  BUTTON_SIZES,
  BUTTON_STATE,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
} from '@/components/Button/shared/constants';
import { IconProps } from '@/components/Icon';
import { ContainerVariant } from '@/variants/container/types';

export type ButtonVariant =
  (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];

export type ButtonTheme = (typeof BUTTON_THEMES)[keyof typeof BUTTON_THEMES];

export type ButtonSize = (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES];

export type ButtonState = (typeof BUTTON_STATE)[keyof typeof BUTTON_STATE];

export type ButtonIconPosition =
  (typeof BUTTON_ICON_POSITIONS)[keyof typeof BUTTON_ICON_POSITIONS];

export type ButtonStyles = Record<ButtonState, string>;

export type ButtonSizeStyle = Record<string, string>;

export interface ButtonPrimitiveProps
  extends Pick<HTMLAttributes<HTMLElement>, 'className'> {
  label: string;
  variant?: ButtonVariant;
  theme?: ButtonTheme;
  size?: ButtonSize;
  iconOption?: Pick<IconProps, 'iconKey'>;
  iconPosition?: ButtonIconPosition;
  responsive?: Partial<Record<ContainerVariant, ButtonSize>>;
  disabled?: boolean;
}

export interface UseButtonRenderErrorEffectProps
  extends Pick<ButtonPrimitiveProps, 'variant' | 'theme' | 'size'> {}

export interface GenerateButtonStyleProps
  extends Pick<
    ButtonPrimitiveProps,
    | 'variant'
    | 'theme'
    | 'size'
    | 'disabled'
    | 'iconOption'
    | 'iconPosition'
    | 'responsive'
  > {}

export interface ButtonIconProps
  extends Pick<IconProps, 'iconKey' | 'className'>,
    Pick<ButtonPrimitiveProps, 'size' | 'responsive'> {}

export interface GetResponsiveStylesProps<T>
  extends Pick<ButtonPrimitiveProps, 'responsive'> {
  styles: Record<ContainerVariant, Record<ButtonSize, T>>;
}
