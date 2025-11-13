import clsx from 'clsx';

import {
  BUTTON_ICON_SIZE_STYLES,
  BUTTON_SIZES,
  ICON_SIZE_RESPONSIVE_STYLES,
} from '@/components/Button/shared/constants';
import { ButtonIconProps } from '@/components/Button/shared/types';
import { getResponsiveStyles } from '@/components/Button/shared/utils/getResponsiveStyles';
import { Icon } from '@/components/Icon';

const ButtonIcon = ({
  iconKey,
  size = BUTTON_SIZES.LG,
  responsive,
  className,
}: ButtonIconProps) => {
  const responsiveStyles = getResponsiveStyles({
    responsive,
    styles: ICON_SIZE_RESPONSIVE_STYLES,
  });

  return (
    <Icon
      className={clsx(
        className,
        BUTTON_ICON_SIZE_STYLES[size],
        responsiveStyles.map((style) => style),
      )}
      iconKey={iconKey}
    />
  );
};

export default ButtonIcon;
