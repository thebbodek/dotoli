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
  [BADGE_VARIANTS.FILLED]: 'rounded-in-4',
  [BADGE_VARIANTS.OUTLINED]: 'rounded-in-4 border border-in-gray-02',
  [BADGE_VARIANTS.STATUS]: 'rounded-in-full',
};

export const BADGE_FILLED_THEME_STYLES: BadgeStyle = {
  [BADGE_THEMES.GRAY]: {
    CONTAINER: 'bg-in-gray-02',
    LABEL: 'text-in-gray-07',
  },
  [BADGE_THEMES.PRIMARY]: {
    CONTAINER: 'bg-in-primary-02',
    LABEL: 'text-in-primary-07',
  },
  [BADGE_THEMES.GREEN]: {
    CONTAINER: 'bg-in-green-01',
    LABEL: 'text-in-green-06',
  },
  [BADGE_THEMES.YELLOW]: {
    CONTAINER: 'bg-in-yellow-01',
    LABEL: 'text-in-yellow-07',
  },
  [BADGE_THEMES.RED]: {
    CONTAINER: 'bg-in-red-01',
    LABEL: 'text-in-red-07',
  },
};

const BADGE_OUTLINED_THEME_DEFAULT_STYLES = {
  CONTAINER: 'border-in-gray-02 border bg-in-white',
  LABEL: 'text-in-gray-06',
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
  [BADGE_THEMES.GRAY]: 'text-in-gray-05',
  [BADGE_THEMES.PRIMARY]: 'text-in-primary-05',
  [BADGE_THEMES.GREEN]: 'text-in-green-04',
  [BADGE_THEMES.YELLOW]: 'text-in-yellow-04',
  [BADGE_THEMES.RED]: 'text-in-red-04',
} as const;

export const BADGE_ICON_SIZE_STYLES: Record<BadgeVariant, string> = {
  [BADGE_VARIANTS.OUTLINED]: 'text-[0.75rem]',
  [BADGE_VARIANTS.FILLED]: 'text-[0.75rem]',
  [BADGE_VARIANTS.STATUS]: 'text-[0.375rem]',
};
