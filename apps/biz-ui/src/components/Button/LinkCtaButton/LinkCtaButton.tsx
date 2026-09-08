import clsx from 'clsx';
import Link from 'next/link';

import {
  CTA_BUTTON_SIZES,
  CTA_BUTTON_THEMES,
  CTA_BUTTON_VARIANTS,
} from '@/components/Button/CtaButton/constants';
import {
  generateCtaButtonIconStyle,
  generateCtaButtonStyle,
} from '@/components/Button/CtaButton/utils';
import { LinkCtaButtonProps } from '@/components/Button/LinkCtaButton/types';
import { ButtonIcon } from '@/components/Button/shared';
import { BUTTON_ICON_POSITIONS } from '@/components/Button/shared/constants';
import { generateLinkButtonClickHandler } from '@/components/Button/shared/utils';

const LinkCtaButton = ({
  label,
  variant = CTA_BUTTON_VARIANTS.FILLED,
  theme = CTA_BUTTON_THEMES.PRIMARY,
  size = CTA_BUTTON_SIZES.LG,
  iconPosition = BUTTON_ICON_POSITIONS.LEFT,
  iconOption,
  isDisabled = false,
  className,
  ref,
  onClick,
  ...props
}: LinkCtaButtonProps) => {
  const { iconKey, weight } = iconOption ?? {};
  const iconStyle = generateCtaButtonIconStyle({
    variant,
    theme,
    disabled: isDisabled,
  });

  return (
    <Link
      {...props}
      className={clsx(
        className,
        generateCtaButtonStyle({
          variant,
          theme,
          size,
          disabled: isDisabled,
          iconPosition,
          hasIcon: !!iconKey,
        }),
      )}
      aria-disabled={isDisabled}
      ref={ref}
      tabIndex={isDisabled ? -1 : undefined}
      onClick={generateLinkButtonClickHandler({ isDisabled, onClick })}
    >
      {!!iconKey && (
        <ButtonIcon className={iconStyle} iconKey={iconKey} weight={weight} />
      )}
      {label}
    </Link>
  );
};

export default LinkCtaButton;
