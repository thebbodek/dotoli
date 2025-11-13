import clsx from 'clsx';

import { BADGE_THEME_STYLES } from '@/components/Badge/constants';
import { BadgeLabelProps, BadgeVariant } from '@/components/Badge/types';
import { Typography } from '@/components/Typography';

const BadgeLabel = <T extends BadgeVariant>({
  label,
  variant,
  title,
  theme,
}: BadgeLabelProps<T>) => {
  const themeStyle = BADGE_THEME_STYLES[variant][theme];

  return (
    <Typography
      className={clsx(themeStyle.LABEL)}
      color='black'
      title={title}
      variant='body-12-m'
    >
      {label}
    </Typography>
  );
};

export default BadgeLabel;
