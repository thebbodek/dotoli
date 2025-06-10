import clsx from 'clsx';

import {
  BUTTON_ICON_SIZE_STYLES,
  BUTTON_SIZES,
} from '@/components/Button/shared/constants';
import { ButtonIconProps } from '@/components/Button/shared/types';
import { Icon } from '@/components/Icon';

const ButtonIcon = ({
  iconKey,
  size = BUTTON_SIZES.LG,
  className,
}: ButtonIconProps) => {
  return (
    <Icon
      iconKey={iconKey}
      className={clsx(className, BUTTON_ICON_SIZE_STYLES[size])}
    />
  );
};

export default ButtonIcon;
