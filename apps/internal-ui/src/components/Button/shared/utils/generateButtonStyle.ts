import clsx from 'clsx';

import {
  BUTTON_ICON_POSITIONS,
  BUTTON_SIZE_RESPONSIVE_STYLES,
  BUTTON_SIZE_STYLES,
  BUTTON_SIZES,
  BUTTON_STYLES,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
} from '@/components/Button/shared/constants';
import {
  ButtonPrimitiveProps,
  ButtonSizeStyle,
  ButtonStyles,
  GenerateButtonStyleProps,
} from '@/components/Button/shared/types';
import { getResponsiveStyles } from '@/components/Button/shared/utils/getResponsiveStyles';

export const generateButtonStyle = ({
  variant = BUTTON_VARIANTS.FILLED,
  theme = BUTTON_THEMES.PRIMARY,
  size = BUTTON_SIZES.LG,
  disabled = false,
  iconOption,
  iconPosition,
  responsive = {} as NonNullable<ButtonPrimitiveProps['responsive']>,
}: GenerateButtonStyleProps) => {
  const { iconKey } = iconOption ?? {};
  const responsiveStyles = getResponsiveStyles({
    responsive,
    styles: BUTTON_SIZE_RESPONSIVE_STYLES,
  });
  const {
    default: defaultStyle,
    disabled: disabledStyle,
    ...themeStyles
  } = (BUTTON_STYLES[theme][variant] ?? {}) as ButtonStyles;

  const getShapeStyle = ({ style }: { style: ButtonSizeStyle }) => {
    return variant === BUTTON_VARIANTS.TEXT
      ? ''
      : `${style.PADDING} ${style.ROUNDED}`;
  };

  return clsx(
    'flex items-center justify-center transition-colors',
    iconPosition === BUTTON_ICON_POSITIONS.RIGHT && 'flex-row-reverse',
    !!iconKey && [
      BUTTON_SIZE_STYLES[size].GAP,
      responsiveStyles.map((style) => style.GAP),
    ],
    [
      BUTTON_SIZE_STYLES[size].DEFAULT,
      responsiveStyles.map((style) => style.DEFAULT),
    ],
    [
      getShapeStyle({ style: BUTTON_SIZE_STYLES[size] }),
      responsiveStyles.map((style) => getShapeStyle({ style })),
    ],
    themeStyles,
    variant === BUTTON_VARIANTS.OUTLINED && 'border',
    disabled
      ? `${disabledStyle} cursor-not-allowed`
      : `${defaultStyle} cursor-pointer`,
  );
};
