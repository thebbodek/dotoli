import { BadgeStyle, BadgeTheme, BadgeVariant } from '@/components/Badge/types';

export const BADGE_VARIANTS = {
  FILLED: 'filled',
  OUTLINED: 'outlined',
  STATUS: 'status',
} as const;

export const BADGE_THEMES = {
  GRAY: 'gray',
  PRIMARY: 'primary',
  GREEN: 'green',
  YELLOW: 'yellow',
  RED: 'red',
} as const;

export const BADGE_VARIANT_STYLES: Record<BadgeVariant, string> = {
  [BADGE_VARIANTS.FILLED]: 'rounded-4',
  [BADGE_VARIANTS.OUTLINED]: 'rounded-4 border border-gray-02',
  [BADGE_VARIANTS.STATUS]: 'rounded-full',
};

export const BADGE_FILLED_THEME_STYLES: BadgeStyle = {
  [BADGE_THEMES.GRAY]: {
    CONTAINER: 'bg-gray-02',
    LABEL: 'text-gray-07',
  },
  [BADGE_THEMES.PRIMARY]: {
    CONTAINER: 'bg-primary-02',
    LABEL: 'text-primary-07',
  },
  [BADGE_THEMES.GREEN]: {
    CONTAINER: 'bg-green-01',
    LABEL: 'text-green-06',
  },
  [BADGE_THEMES.YELLOW]: {
    CONTAINER: 'bg-yellow-01',
    LABEL: 'text-yellow-07',
  },
  [BADGE_THEMES.RED]: {
    CONTAINER: 'bg-red-01',
    LABEL: 'text-red-07',
  },
};

const BADGE_OUTLINED_THEME_DEFAULT_STYLES = {
  CONTAINER: 'border-gray-02 border bg-white',
  LABEL: 'text-gray-06',
};

export const BADGE_THEME_STYLES: Record<BadgeVariant, BadgeStyle> = {
  [BADGE_VARIANTS.OUTLINED]: {
    [BADGE_THEMES.GRAY]: BADGE_OUTLINED_THEME_DEFAULT_STYLES,
    [BADGE_THEMES.PRIMARY]: BADGE_OUTLINED_THEME_DEFAULT_STYLES,
    [BADGE_THEMES.GREEN]: BADGE_OUTLINED_THEME_DEFAULT_STYLES,
    [BADGE_THEMES.YELLOW]: BADGE_OUTLINED_THEME_DEFAULT_STYLES,
    [BADGE_THEMES.RED]: BADGE_OUTLINED_THEME_DEFAULT_STYLES,
  },
  [BADGE_VARIANTS.FILLED]: BADGE_FILLED_THEME_STYLES,
  [BADGE_VARIANTS.STATUS]: BADGE_FILLED_THEME_STYLES,
} as const;

export const BADGE_THEME_ICON_STYLES: Record<BadgeTheme, string> = {
  [BADGE_THEMES.GRAY]: 'text-gray-05',
  [BADGE_THEMES.PRIMARY]: 'text-primary-05',
  [BADGE_THEMES.GREEN]: 'text-green-04',
  [BADGE_THEMES.YELLOW]: 'text-yellow-04',
  [BADGE_THEMES.RED]: 'text-red-04',
} as const;

export const BADGE_ICON_SIZE_STYLES: Record<BadgeVariant, string> = {
  [BADGE_VARIANTS.OUTLINED]: 'text-[0.75rem]',
  [BADGE_VARIANTS.FILLED]: 'text-[0.75rem]',
  [BADGE_VARIANTS.STATUS]: 'text-[0.375rem]',
};
