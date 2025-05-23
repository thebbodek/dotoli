import clsx from 'clsx';

import {
  BADGE_ICON_SIZE_STYLES,
  BADGE_THEME_ICON_STYLES,
} from '@/components/Badge/constants';
import { BadgeIconProps, BadgeVariant } from '@/components/Badge/types';
import { Icon } from '@/components/Icon';

const BadgeIcon = <T extends BadgeVariant>({
  variant,
  theme,
  iconKey,
}: BadgeIconProps<T>) => {
  return (
    <Icon
      weight='fill'
      iconKey={iconKey}
      className={clsx(
        BADGE_ICON_SIZE_STYLES[variant],
        BADGE_THEME_ICON_STYLES[theme],
      )}
    />
  );
};

export default BadgeIcon;
