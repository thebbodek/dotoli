import {
  BADGE_THEMES,
  BADGE_VARIANTS,
  INFO_BADGE_SIZES,
  INFO_BADGE_THEMES,
  INFO_BADGE_VARIANTS,
} from '@/components/Badge/constants';
import { IconProps } from '@/components/Icon';
import { TypographyProps } from '@/components/Typography';

export type BadgeStatusVariant = typeof BADGE_VARIANTS.STATUS;

export type BadgeVariant = (typeof BADGE_VARIANTS)[keyof typeof BADGE_VARIANTS];

export type InfoBadgeVariant =
  (typeof INFO_BADGE_VARIANTS)[keyof typeof INFO_BADGE_VARIANTS];

export type BadgeTheme = (typeof BADGE_THEMES)[keyof typeof BADGE_THEMES];

export type InfoBadgeTheme =
  (typeof INFO_BADGE_THEMES)[keyof typeof INFO_BADGE_THEMES];

export type BadgeStyle = Record<
  BadgeTheme,
  { CONTAINER: string; LABEL: string }
>;

export type InfoBadgeStyle = Record<
  InfoBadgeTheme,
  { CONTAINER: string; LABEL: string }
>;

export interface BadgeBaseProps<T extends BadgeVariant>
  extends Pick<TypographyProps, 'className' | 'title'> {
  label: string;
  variant?: T;
  theme?: BadgeTheme;
}

export type BadgeProps<T extends BadgeVariant> = T extends BadgeStatusVariant
  ? BadgeBaseProps<T>
  : BadgeBaseProps<T> & Partial<Pick<IconProps, 'iconKey'>>;

export type InfoBadgeSize =
  (typeof INFO_BADGE_SIZES)[keyof typeof INFO_BADGE_SIZES];
export interface InfoBadgeBaseProps<T extends InfoBadgeVariant>
  extends Pick<TypographyProps, 'className' | 'title'> {
  label: string;
  size?: InfoBadgeSize;
  variant?: T;
  theme?: InfoBadgeTheme;
}

export type BadgeIconProps<T extends BadgeVariant> = Required<
  Pick<BadgeBaseProps<T>, 'variant' | 'theme'>
> &
  Pick<IconProps, 'iconKey'>;

export interface BadgeFilledIconKeyProps
  extends Pick<BadgeProps<typeof BADGE_VARIANTS.FILLED>, 'iconKey'> {}

export interface BadgeLabelProps<T extends BadgeVariant>
  extends Required<Pick<BadgeBaseProps<T>, 'variant' | 'theme'>>,
    Pick<BadgeBaseProps<T>, 'label' | 'title'> {}
