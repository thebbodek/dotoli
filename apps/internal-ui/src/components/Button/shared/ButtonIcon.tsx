import {
  BUTTON_SIZES,
  BUTTON_ICON_SIZE_STYLES,
} from '@/components/Button/shared/constants';
import { ButtonIconProps } from '@/components/Button/shared/types';
import { Icon } from '@/components/Icon';

const ButtonIcon = ({ iconKey, size = BUTTON_SIZES.LG }: ButtonIconProps) => {
  return <Icon iconKey={iconKey} className={BUTTON_ICON_SIZE_STYLES[size]} />;
};

export default ButtonIcon;
