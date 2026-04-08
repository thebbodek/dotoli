import clsx from 'clsx';

import {
  INFO_BADGE_CIRCLE_SOFT_THEME_STYLES,
  INFO_BADGE_SIZE_STYLES,
  INFO_BADGE_SIZES,
  INFO_BADGE_THEME_STYLES,
  INFO_BADGE_THEMES,
  INFO_BADGE_VARIANT_STYLES,
  INFO_BADGE_VARIANTS,
} from '@/components/Badge/constants';
import { InfoBadgeBaseProps, InfoBadgeVariant } from '@/components/Badge/types';
import { Typography } from '@/components/Typography';

const InfoBadge = ({
  label,
  variant = INFO_BADGE_VARIANTS.INFO,
  theme = INFO_BADGE_THEMES.PRIMARY,
  className,
  title,
  size = INFO_BADGE_SIZES.MD,
}: InfoBadgeBaseProps<InfoBadgeVariant>) => {
  const themeStyles =
    variant === INFO_BADGE_VARIANTS.CIRCLE_SOFT
      ? INFO_BADGE_CIRCLE_SOFT_THEME_STYLES
      : INFO_BADGE_THEME_STYLES;
  const themeStyle = themeStyles[theme];
  const sizeStyle = INFO_BADGE_SIZE_STYLES[size];

  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center',
        INFO_BADGE_VARIANT_STYLES[variant],
        sizeStyle,
        themeStyle.CONTAINER,
        className,
      )}
    >
      <Typography className={themeStyle.LABEL} color='black' title={title}>
        {label}
      </Typography>
    </div>
  );
};

export default InfoBadge;
