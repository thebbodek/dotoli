import { BADGE_THEMES } from '@/components/Badge/shared/constants';

export type BadgeTheme = (typeof BADGE_THEMES)[keyof typeof BADGE_THEMES];

export interface BadgeThemeStyle {
  CONTAINER: string;
  LABEL: string;
}

export type BadgeStyle = Record<BadgeTheme, BadgeThemeStyle>;
