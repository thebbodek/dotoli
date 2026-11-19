import clsx from 'clsx';

import {
  CTA_BUTTON_ICON_SIZE_STYLES,
  CTA_BUTTON_SIZES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
} from '@/components/Button/CtaButton/constants';
import CtaButtonLabel from '@/components/Button/CtaButton/CtaButtonLabel';
import { CtaButtonProps } from '@/components/Button/CtaButton/types';
import {
  generateCtaButtonIconStyle,
  generateCtaButtonStyle,
} from '@/components/Button/CtaButton/utils';
import { ButtonIcon } from '@/components/Button/shared';
import {
  BUTTON_ICON_POSITIONS,
  BUTTON_PENDING_ICON_KEY,
} from '@/components/Button/shared/constants';

const CtaButton = ({
  label,
  description,
  variant = CTA_BUTTON_VARIANTS.FILLED,
  theme = CTA_BUTTON_THEMES.PRIMARY,
  size = CTA_BUTTON_SIZES.LG,
  iconPosition = BUTTON_ICON_POSITIONS.LEFT,
  iconOption,
  isPending = false,
  useUnderline = false,
  disabled = false,
  type = 'button',
  className,
  onClick,
  ref,
}: CtaButtonProps) => {
  const { iconKey, weight } = iconOption ?? {};
  const hasIcon = isPending || !!iconKey;
  const isDisabled = disabled || isPending;
  const iconStyle = generateCtaButtonIconStyle({
    variant,
    theme,
    size,
    disabled: isDisabled,
  });

  return (
    <button
      className={clsx(
        className,
        generateCtaButtonStyle({
          variant,
          theme,
          size,
          disabled: isDisabled,
          iconPosition,
          hasIcon,
        }),
      )}
      aria-busy={isPending}
      disabled={isDisabled}
      ref={ref}
      type={type}
      onClick={onClick}
    >
      {isPending ? (
        <ButtonIcon
          className={clsx('animate-spin', CTA_BUTTON_ICON_SIZE_STYLES[size])}
          iconKey={BUTTON_PENDING_ICON_KEY}
        />
      ) : (
        !!iconKey && (
          <ButtonIcon className={iconStyle} iconKey={iconKey} weight={weight} />
        )
      )}
      <CtaButtonLabel
        description={description}
        label={label}
        useUnderline={useUnderline}
      />
    </button>
  );
};

export default CtaButton;
