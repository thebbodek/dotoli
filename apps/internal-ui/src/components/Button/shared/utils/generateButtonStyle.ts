import {
  BUTTON_ICON_POSITIONS,
  BUTTON_SIZE_STYLES,
  BUTTON_SIZES,
  BUTTON_STATE,
  BUTTON_STYLES,
  BUTTON_THEMES,
  BUTTON_VARIANTS,
} from '@/components/Button/shared/constants';
import {
  ButtonState,
  ButtonStyles,
  GenerateButtonStyleProps,
} from '@/components/Button/shared/types';

export const generateButtonStyle = ({
  variant = BUTTON_VARIANTS.FILLED,
  theme = BUTTON_THEMES.PRIMARY,
  size = BUTTON_SIZES.LG,
  disabled = false,
  iconKey,
  iconPosition = BUTTON_ICON_POSITIONS.LEFT,
}: GenerateButtonStyleProps) => {
  const styles = (BUTTON_STYLES[theme][variant] ?? {}) as ButtonStyles;
  const filteredStyles = Object.keys(styles).filter(
    (state) => (state === BUTTON_STATE.DISABLED) === disabled,
  );

  return [
    'flex items-center justify-center transition-colors',
    !!iconKey && BUTTON_SIZE_STYLES[size].GAP,
    iconPosition === BUTTON_ICON_POSITIONS.RIGHT && 'flex-row-reverse',
    BUTTON_SIZE_STYLES[size].DEFAULT,
    variant !== BUTTON_VARIANTS.TEXT &&
      `${BUTTON_SIZE_STYLES[size].PADDING} ${BUTTON_SIZE_STYLES[size].ROUNDED}`,
    variant === BUTTON_VARIANTS.OUTLINED && 'border',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
    ...filteredStyles.map((state) => styles[state as ButtonState]),
  ];
};
