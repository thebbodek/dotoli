import { BadgeTheme, BadgeVariant } from '@/components/Badge/types';

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
  'inline-flex items-center justify-center rounded-6 px-[8px] py-[3px] text-caption';

export const BADGE_STYLES: Record<BadgeVariant, Record<BadgeTheme, string>> = {
  [BADGE_VARIANTS.TONAL]: {
    [BADGE_THEMES.PRIMARY]:
      'bg-blue-100 text-blue-700 inset-ring inset-ring-blue-200',
    [BADGE_THEMES.YELLOW]:
      'bg-yellow-50 text-yellow-800 inset-ring inset-ring-yellow-100',
    [BADGE_THEMES.RED]: 'bg-red-50 text-red-700 inset-ring inset-ring-red-100',
    [BADGE_THEMES.GREEN]:
      'bg-green-50 text-green-700 inset-ring inset-ring-green-100',
    [BADGE_THEMES.GRAY]:
      'bg-gray-100 text-gray-800 inset-ring inset-ring-gray-200',
  },
  [BADGE_VARIANTS.FILLED]: {
    [BADGE_THEMES.PRIMARY]: 'bg-blue-600 text-white',
    [BADGE_THEMES.YELLOW]: 'bg-yellow-600 text-white',
    [BADGE_THEMES.RED]: 'bg-red-500 text-white',
    [BADGE_THEMES.GREEN]: 'bg-green-600 text-white',
    [BADGE_THEMES.GRAY]: 'bg-gray-600 text-white',
  },
};
