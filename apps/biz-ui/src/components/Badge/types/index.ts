import { HTMLAttributes } from 'react';

import { BADGE_THEMES, BADGE_VARIANTS } from '@/components/Badge/constants';
import { ColorVariants } from '@/variants';

export type BadgeTheme = (typeof BADGE_THEMES)[keyof typeof BADGE_THEMES];

export type BadgeVariant = (typeof BADGE_VARIANTS)[keyof typeof BADGE_VARIANTS];

export interface BadgeThemeStyles {
  CONTAINER: string;
  LABEL: ColorVariants;
}

export interface BadgeProps
  extends Pick<HTMLAttributes<HTMLSpanElement>, 'className'> {
  label: string;
  theme?: BadgeTheme;
  variant?: BadgeVariant;
}
