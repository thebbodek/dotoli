import { ButtonHTMLAttributes, RefAttributes } from 'react';

import {
  CTA_BUTTON_SIZES,
  CTA_BUTTON_STATES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
} from '@/components/Button/CtaButton/constants';
import {
  ButtonIconOption,
  ButtonIconPosition,
} from '@/components/Button/shared/types';

export type CtaButtonVariant =
  (typeof CTA_BUTTON_VARIANTS)[keyof typeof CTA_BUTTON_VARIANTS];

export type CtaButtonTheme =
  (typeof CTA_BUTTON_THEMES)[keyof typeof CTA_BUTTON_THEMES];

export type CtaButtonSize =
  (typeof CTA_BUTTON_SIZES)[keyof typeof CTA_BUTTON_SIZES];

export type CtaButtonState =
  (typeof CTA_BUTTON_STATES)[keyof typeof CTA_BUTTON_STATES];

export type CtaButtonStyles = Record<CtaButtonState, string>;

export interface GenerateCtaButtonStyleProps
  extends Pick<
    CtaButtonProps,
    'variant' | 'theme' | 'size' | 'disabled' | 'iconPosition'
  > {
  hasIcon?: boolean;
}

export interface GenerateCtaButtonIconStyleProps
  extends Pick<CtaButtonProps, 'variant' | 'theme' | 'size' | 'disabled'> {}

export interface CtaButtonLabelProps
  extends Pick<CtaButtonProps, 'label' | 'description'> {}

export interface CtaButtonBaseProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'className' | 'disabled' | 'onClick' | 'type'
    >,
    RefAttributes<HTMLButtonElement> {
  label: string;
  variant?: CtaButtonVariant;
  theme?: CtaButtonTheme;
  iconPosition?: ButtonIconPosition;
  iconOption?: ButtonIconOption;
  isPending?: boolean;
}

export interface CtaButtonFixedHeightSizeProps {
  size?: Exclude<CtaButtonSize, typeof CTA_BUTTON_SIZES.XL>;
  description?: never;
}

export interface CtaButtonXlSizeProps {
  size: typeof CTA_BUTTON_SIZES.XL;
  description?: string;
}

export type CtaButtonSizeProps =
  | CtaButtonFixedHeightSizeProps
  | CtaButtonXlSizeProps;

export type CtaButtonProps = CtaButtonBaseProps & CtaButtonSizeProps;
