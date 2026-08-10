import clsx from 'clsx';

import {
  ICON_BUTTON_SIZE_STYLES,
  ICON_BUTTON_SIZES,
  ICON_BUTTON_STATES,
  ICON_BUTTON_STYLES,
  ICON_BUTTON_THEMES,
} from '@/components/Button/IconButton/constants';
import { GenerateIconButtonStyleProps } from '@/components/Button/IconButton/types';
import { BUTTON_TOUCH_TARGET_STYLE } from '@/components/Button/shared/constants';

export const generateIconButtonStyle = ({
  theme = ICON_BUTTON_THEMES.DEFAULT,
  size = ICON_BUTTON_SIZES.LG,
  disabled = false,
}: GenerateIconButtonStyleProps) => {
  const { [ICON_BUTTON_STATES.DISABLED]: disabledStyle, ...stateStyles } =
    ICON_BUTTON_STYLES[theme];
  const { SIZE, ICON, ROUNDED } = ICON_BUTTON_SIZE_STYLES[size];

  return clsx(
    'flex-h-stack-center relative transition-colors',
    SIZE,
    ICON,
    ROUNDED,
    BUTTON_TOUCH_TARGET_STYLE,
    disabled
      ? [disabledStyle, 'cursor-not-allowed']
      : [Object.values(stateStyles), 'cursor-pointer'],
  );
};
