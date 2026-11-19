import clsx from 'clsx';

import {
  CTA_BUTTON_DISABLED_ICON_STYLE,
  CTA_BUTTON_ICON_SIZE_STYLES,
  CTA_BUTTON_ICON_STYLES,
  CTA_BUTTON_SIZES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
} from '@/components/Button/CtaButton/constants';
import { GenerateCtaButtonIconStyleProps } from '@/components/Button/CtaButton/types';

export const generateCtaButtonIconStyle = ({
  variant = CTA_BUTTON_VARIANTS.FILLED,
  theme = CTA_BUTTON_THEMES.PRIMARY,
  size = CTA_BUTTON_SIZES.LG,
  disabled = false,
}: GenerateCtaButtonIconStyleProps) => {
  return clsx(
    CTA_BUTTON_ICON_SIZE_STYLES[size],
    disabled
      ? CTA_BUTTON_DISABLED_ICON_STYLE
      : CTA_BUTTON_ICON_STYLES[theme][variant],
  );
};
