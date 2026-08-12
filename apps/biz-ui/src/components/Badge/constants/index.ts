import {
  BadgeTheme,
  BadgeThemeStyles,
  BadgeVariant,
} from '@/components/Badge/types';
import { COLOR_VARIANTS } from '@/variants';

export const BADGE_THEMES = {
  PRIMARY: 'primary',
  YELLOW: 'yellow',
  RED: 'red',
  GREEN: 'green',
  GRAY: 'gray',
} as const;

export const BADGE_VARIANTS = {
  TONAL: 'tonal',
  FILLED: 'filled',
} as const;

export const BADGE_BASE_STYLE =
  'inline-flex items-center justify-center rounded-6 px-[8px] py-[3px]';

export const BADGE_STYLES: Record<
  BadgeVariant,
  Record<BadgeTheme, BadgeThemeStyles>
> = {
  [BADGE_VARIANTS.TONAL]: {
    [BADGE_THEMES.PRIMARY]: {
      CONTAINER: 'bg-blue-100 inset-ring inset-ring-blue-200',
      LABEL: COLOR_VARIANTS.BLUE_700,
    },
    [BADGE_THEMES.YELLOW]: {
      CONTAINER: 'bg-yellow-50 inset-ring inset-ring-yellow-100',
      LABEL: COLOR_VARIANTS.YELLOW_800,
    },
    [BADGE_THEMES.RED]: {
      CONTAINER: 'bg-red-50 inset-ring inset-ring-red-100',
      LABEL: COLOR_VARIANTS.RED_700,
    },
    [BADGE_THEMES.GREEN]: {
      CONTAINER: 'bg-green-50 inset-ring inset-ring-green-100',
      LABEL: COLOR_VARIANTS.GREEN_700,
    },
    [BADGE_THEMES.GRAY]: {
      CONTAINER: 'bg-gray-100 inset-ring inset-ring-gray-200',
      LABEL: COLOR_VARIANTS.GRAY_800,
    },
  },
  [BADGE_VARIANTS.FILLED]: {
    [BADGE_THEMES.PRIMARY]: {
      CONTAINER: 'bg-blue-600',
      LABEL: COLOR_VARIANTS.WHITE,
    },
    [BADGE_THEMES.YELLOW]: {
      CONTAINER: 'bg-yellow-600',
      LABEL: COLOR_VARIANTS.WHITE,
    },
    [BADGE_THEMES.RED]: {
      CONTAINER: 'bg-red-500',
      LABEL: COLOR_VARIANTS.WHITE,
    },
    [BADGE_THEMES.GREEN]: {
      CONTAINER: 'bg-green-600',
      LABEL: COLOR_VARIANTS.WHITE,
    },
    [BADGE_THEMES.GRAY]: {
      CONTAINER: 'bg-gray-600',
      LABEL: COLOR_VARIANTS.WHITE,
    },
  },
};
