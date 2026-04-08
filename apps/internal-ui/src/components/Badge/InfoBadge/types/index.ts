import {
  INFO_BADGE_SIZES,
  INFO_BADGE_THEMES,
  INFO_BADGE_VARIANTS,
} from '@/components/Badge/InfoBadge/constants';
import type { BadgeThemeStyle } from '@/components/Badge/shared/types';
import { TypographyProps } from '@/components/Typography';

export type InfoBadgeVariant =
  (typeof INFO_BADGE_VARIANTS)[keyof typeof INFO_BADGE_VARIANTS];

export type InfoBadgeTheme =
  (typeof INFO_BADGE_THEMES)[keyof typeof INFO_BADGE_THEMES];

export type InfoBadgeSize =
  (typeof INFO_BADGE_SIZES)[keyof typeof INFO_BADGE_SIZES];

export type InfoBadgeStyle = Record<InfoBadgeTheme, BadgeThemeStyle>;

export interface InfoBadgeBaseProps
  extends Pick<TypographyProps, 'className' | 'title'> {
  label: string;
  size?: InfoBadgeSize;
  variant?: InfoBadgeVariant;
  theme?: InfoBadgeTheme;
}
