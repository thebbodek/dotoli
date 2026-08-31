import clsx from 'clsx';

import {
  CTA_BUTTON_GAP_STYLES,
  CTA_BUTTON_SIZE_STYLES,
  CTA_BUTTON_SIZES,
  CTA_BUTTON_STATES,
  CTA_BUTTON_STYLES,
  CTA_BUTTON_TEXT_SIZE_STYLES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
} from '@/components/Button/CtaButton/constants';
import { GenerateCtaButtonStyleProps } from '@/components/Button/CtaButton/types';
import { BUTTON_ICON_POSITIONS } from '@/components/Button/shared/constants';
import { TOUCH_TARGET_STYLE } from '@/components/shared/constants';

export const generateCtaButtonStyle = ({
  variant = CTA_BUTTON_VARIANTS.FILLED,
  theme = CTA_BUTTON_THEMES.PRIMARY,
  size = CTA_BUTTON_SIZES.LG,
  disabled = false,
  iconPosition = BUTTON_ICON_POSITIONS.LEFT,
  hasIcon = false,
}: GenerateCtaButtonStyleProps) => {
  const isText = variant === CTA_BUTTON_VARIANTS.TEXT;
  const { [CTA_BUTTON_STATES.DISABLED]: disabledStyle, ...stateStyles } =
    CTA_BUTTON_STYLES[theme][variant];
  const sizeStyle = isText
    ? CTA_BUTTON_TEXT_SIZE_STYLES[size]
    : CTA_BUTTON_SIZE_STYLES[size];
  const shouldExpandTouchTarget = isText || size === CTA_BUTTON_SIZES.SM;

  return clsx(
    'flex-h-stack-center relative transition-colors',
    iconPosition === BUTTON_ICON_POSITIONS.RIGHT && 'flex-row-reverse',
    hasIcon && CTA_BUTTON_GAP_STYLES[variant][size],
    sizeStyle.ROUNDED,
    sizeStyle.TYPOGRAPHY,
    !isText && [
      CTA_BUTTON_SIZE_STYLES[size].HEIGHT,
      CTA_BUTTON_SIZE_STYLES[size].PADDING,
    ],
    shouldExpandTouchTarget && TOUCH_TARGET_STYLE,
    variant === CTA_BUTTON_VARIANTS.OUTLINED && 'inset-ring',
    disabled
      ? [disabledStyle, 'cursor-not-allowed']
      : [Object.values(stateStyles), 'cursor-pointer'],
  );
};
