import clsx from 'clsx';

import {
  BADGE_BASE_STYLE,
  BADGE_STYLES,
  BADGE_THEMES,
  BADGE_VARIANTS,
} from '@/components/Badge/constants';
import { BadgeProps } from '@/components/Badge/types';

const Badge = ({
  label,
  theme = BADGE_THEMES.PRIMARY,
  variant = BADGE_VARIANTS.TONAL,
  className,
}: BadgeProps) => (
  <span
    className={clsx(className, BADGE_BASE_STYLE, BADGE_STYLES[variant][theme])}
  >
    {label}
  </span>
);

export default Badge;
