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

export interface CtaButtonProps
  extends Pick<
      ButtonHTMLAttributes<HTMLButtonElement>,
      'className' | 'disabled' | 'onClick' | 'type'
    >,
    RefAttributes<HTMLButtonElement> {
  label: string;
  variant?: CtaButtonVariant;
  theme?: CtaButtonTheme;
  size?: CtaButtonSize;
  iconPosition?: ButtonIconPosition;
  iconOption?: ButtonIconOption;
  isPending?: boolean;
}
