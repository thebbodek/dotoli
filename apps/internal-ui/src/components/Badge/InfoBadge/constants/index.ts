import { BADGE_FILLED_THEME_STYLES } from '@/components/Badge/Badge/constants';
import type {
  InfoBadgeSize,
  InfoBadgeStyle,
  InfoBadgeVariant,
} from '@/components/Badge/InfoBadge/types';
import { BADGE_THEMES } from '@/components/Badge/shared/constants';

export const INFO_BADGE_VARIANTS = {
  INFO: 'info',
  CIRCLE: 'circle',
  CIRCLE_SOFT: 'circle-soft',
} as const;

export const INFO_BADGE_SIZES = {
  SM: 'sm',
  MD: 'md',
} as const;

export const INFO_BADGE_THEMES = {
  ...BADGE_THEMES,
  BLUR: 'blur',
} as const;

export const INFO_BADGE_VARIANT_STYLES: Record<InfoBadgeVariant, string> = {
  [INFO_BADGE_VARIANTS.INFO]: 'rounded-in-full px-1.25',
  [INFO_BADGE_VARIANTS.CIRCLE]: 'aspect-square rounded-in-full',
  [INFO_BADGE_VARIANTS.CIRCLE_SOFT]: 'aspect-square rounded-in-full',
};

export const INFO_BADGE_CIRCLE_SOFT_THEME_STYLES: InfoBadgeStyle = {
  ...BADGE_FILLED_THEME_STYLES,
  [INFO_BADGE_THEMES.BLUR]: {
    CONTAINER: 'bg-in-gray-01',
    LABEL: 'text-in-gray-04',
  },
} as const;

const INFO_BADGE_THEME_DEFAULT_STYLES: InfoBadgeStyle = {
  [INFO_BADGE_THEMES.GRAY]: {
    CONTAINER: 'bg-in-gray-05',
    LABEL: 'text-in-white',
  },
  [INFO_BADGE_THEMES.PRIMARY]: {
    CONTAINER: 'bg-in-primary-05',
    LABEL: 'text-in-white',
  },
  [INFO_BADGE_THEMES.GREEN]: {
    CONTAINER: 'bg-in-green-05',
    LABEL: 'text-in-white',
  },
  [INFO_BADGE_THEMES.YELLOW]: {
    CONTAINER: 'bg-in-yellow-05',
    LABEL: 'text-in-white',
  },
  [INFO_BADGE_THEMES.RED]: {
    CONTAINER: 'bg-in-red-05',
    LABEL: 'text-in-white',
  },
  [INFO_BADGE_THEMES.BLUR]: {
    CONTAINER: 'bg-in-gray-03',
    LABEL: 'text-in-white',
  },
};

export const INFO_BADGE_THEME_STYLES: InfoBadgeStyle = {
  ...INFO_BADGE_THEME_DEFAULT_STYLES,
} as const;

export const INFO_BADGE_THEME_VARIANT_STYLES: Record<
  InfoBadgeVariant,
  InfoBadgeStyle
> = {
  [INFO_BADGE_VARIANTS.INFO]: INFO_BADGE_THEME_STYLES,
  [INFO_BADGE_VARIANTS.CIRCLE]: INFO_BADGE_THEME_STYLES,
  [INFO_BADGE_VARIANTS.CIRCLE_SOFT]: INFO_BADGE_CIRCLE_SOFT_THEME_STYLES,
} as const;

export const INFO_BADGE_SIZE_STYLES: Record<InfoBadgeSize, string> = {
  [INFO_BADGE_SIZES.SM]: 'h-3.75 text-[0.625rem] font-medium',
  [INFO_BADGE_SIZES.MD]: 'h-4.5 text-in-body-12-m',
};
