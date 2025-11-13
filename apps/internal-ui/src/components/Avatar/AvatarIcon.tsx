import {
  AVATAR_ICON_KEYS,
  AVATAR_ICON_STYLES,
} from '@/components/Avatar/constants';
import { AvatarIconProps } from '@/components/Avatar/types';
import { Icon } from '@/components/Icon';

const AvatarIcon = ({ type, size }: AvatarIconProps) => {
  return (
    <Icon
      className={AVATAR_ICON_STYLES[type][size]}
      iconKey={AVATAR_ICON_KEYS[type]}
      weight='fill'
    />
  );
};

export default AvatarIcon;
