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
  return (
    <Typography
      variant='body-12-m'
      className={clsx(BADGE_THEME_STYLES[variant][theme].LABEL)}
      title={title}
    >
      {label}
    </Typography>
  );
};

export default BadgeLabel;
