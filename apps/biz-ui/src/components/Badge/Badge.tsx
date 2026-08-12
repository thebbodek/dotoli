import clsx from 'clsx';

import {
  BADGE_BASE_STYLE,
  BADGE_STYLES,
  BADGE_THEMES,
  BADGE_VARIANTS,
} from '@/components/Badge/constants';
import { BadgeProps } from '@/components/Badge/types';
import { Typography } from '@/components/Typography';
import { TYPOGRAPHY_VARIANTS } from '@/variants';

const Badge = ({
  label,
  theme = BADGE_THEMES.PRIMARY,
  variant = BADGE_VARIANTS.TONAL,
  className,
}: BadgeProps) => {
  const { CONTAINER, LABEL } = BADGE_STYLES[variant][theme];

  return (
    <span className={clsx(className, BADGE_BASE_STYLE, CONTAINER)}>
      <Typography color={LABEL} variant={TYPOGRAPHY_VARIANTS.CAPTION}>
        {label}
      </Typography>
    </span>
  );
};

export default Badge;
