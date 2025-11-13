import clsx from 'clsx';

import BadgeIcon from '@/components/Badge/BadgeIcon';
import BadgeLabel from '@/components/Badge/BadgeLabel';
import {
  BADGE_THEME_STYLES,
  BADGE_THEMES,
  BADGE_VARIANT_STYLES,
  BADGE_VARIANTS,
} from '@/components/Badge/constants';
import {
  BadgeFilledIconKeyProps,
  BadgeProps,
  BadgeVariant,
} from '@/components/Badge/types';

const Badge = <T extends BadgeVariant>({
  label,
  variant = BADGE_VARIANTS.STATUS,
  theme = BADGE_THEMES.PRIMARY,
  className,
  title,
  ...props
}: BadgeProps<T>) => {
  const customIconKey = (props as BadgeFilledIconKeyProps).iconKey;
  const iconKey = variant === BADGE_VARIANTS.STATUS ? 'circle' : customIconKey;
  const themeStyle = BADGE_THEME_STYLES[variant][theme];

  return (
    <div
      className={clsx(
        'inline-flex h-5 items-center justify-center gap-x-1 px-2',
        BADGE_VARIANT_STYLES[variant],
        themeStyle.CONTAINER,
        className,
      )}
    >
      {iconKey && (
        <BadgeIcon iconKey={iconKey} theme={theme} variant={variant} />
      )}
      <BadgeLabel label={label} theme={theme} title={title} variant={variant} />
    </div>
  );
};

export default Badge;
