import { BADGE_THEMES, BADGE_VARIANTS } from '@/components/Badge/constants';
import { IconProps } from '@/components/Icon';
import { TypographyProps } from '@/components/Typography';

export type BadgeStatusVariant = typeof BADGE_VARIANTS.STATUS;

export type BadgeVariant = (typeof BADGE_VARIANTS)[keyof typeof BADGE_VARIANTS];

export type BadgeTheme = (typeof BADGE_THEMES)[keyof typeof BADGE_THEMES];

export type BadgeStyle = Record<
  BadgeTheme,
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

export type BadgeIconProps<T extends BadgeVariant> = Required<
  Pick<BadgeBaseProps<T>, 'variant' | 'theme'>
> &
  Pick<IconProps, 'iconKey'>;

export interface BadgeFilledIconKeyProps
  extends Pick<BadgeProps<typeof BADGE_VARIANTS.FILLED>, 'iconKey'> {}

export interface BadgeLabelProps<T extends BadgeVariant>
  extends Required<Pick<BadgeBaseProps<T>, 'variant' | 'theme'>>,
    Pick<BadgeBaseProps<T>, 'label' | 'title'> {}
