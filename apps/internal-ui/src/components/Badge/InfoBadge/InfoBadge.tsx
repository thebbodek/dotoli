import clsx from 'clsx';

import {
  INFO_BADGE_SIZE_STYLES,
  INFO_BADGE_SIZES,
  INFO_BADGE_THEME_VARIANT_STYLES,
  INFO_BADGE_THEMES,
  INFO_BADGE_VARIANT_STYLES,
  INFO_BADGE_VARIANTS,
} from '@/components/Badge/InfoBadge/constants';
import { InfoBadgeBaseProps } from '@/components/Badge/InfoBadge/types';
import { Typography } from '@/components/Typography';

const InfoBadge = ({
  label,
  variant = INFO_BADGE_VARIANTS.INFO,
  theme = INFO_BADGE_THEMES.PRIMARY,
  className,
  title,
  size = INFO_BADGE_SIZES.MD,
}: InfoBadgeBaseProps) => {
  const themeStyle = INFO_BADGE_THEME_VARIANT_STYLES[variant][theme];
  const sizeStyle = INFO_BADGE_SIZE_STYLES[size];

  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center',
        INFO_BADGE_VARIANT_STYLES[variant],
        sizeStyle,
        themeStyle.CONTAINER,
        themeStyle.LABEL,
        className,
      )}
    >
      <Typography title={title}>{label}</Typography>
    </div>
  );
};

export default InfoBadge;
