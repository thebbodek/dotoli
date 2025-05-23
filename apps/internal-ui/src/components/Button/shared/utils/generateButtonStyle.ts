import {
  BUTTON_VARIANTS,
  BUTTON_THEMES,
  BUTTON_SIZES,
  BUTTON_STYLES,
  BUTTON_STATE,
  BUTTON_SIZE_STYLES,
} from '@/components/Button/shared/constants';
import {
  GenerateButtonStyleProps,
  ButtonStyles,
  ButtonState,
} from '@/components/Button/shared/types';

export const generateButtonStyle = ({
  variant = BUTTON_VARIANTS.FILLED,
  theme = BUTTON_THEMES.PRIMARY,
  size = BUTTON_SIZES.LG,
  disabled = false,
  leftIconKey,
  rightIconKey,
}: GenerateButtonStyleProps) => {
  const styles = (BUTTON_STYLES[theme][variant] ?? {}) as ButtonStyles;
  const hasIcon = leftIconKey || rightIconKey;
  const filteredStyles = Object.keys(styles).filter(
    (state) => (state === BUTTON_STATE.DISABLED) === disabled,
  );

  return [
    'flex items-center justify-center transition-colors',
    ...filteredStyles.map((state) => styles[state as ButtonState]),
    BUTTON_SIZE_STYLES[size].DEFAULT,
    hasIcon && BUTTON_SIZE_STYLES[size].GAP,
    variant !== BUTTON_VARIANTS.TEXT &&
      `${BUTTON_SIZE_STYLES[size].PADDING} ${BUTTON_SIZE_STYLES[size].ROUNDED}`,
    variant === BUTTON_VARIANTS.OUTLINED && 'border',
    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
  ];
};
